// eslint-disable-next-line
import { Prisma } from "@prisma/client";

import { db } from "./db";
import { getPoints } from "./points";

type SubmissionWithTestcases = Prisma.SubmissionGetPayload<{
  include: {
    testcases: true;
  };
}>;

export async function updateMemoryAndExecutionTime(
  submission: SubmissionWithTestcases,
) {
  const pendingTestcases = submission.testcases.filter(
    (testcase: { status_id: number }) =>
      testcase.status_id === 1 || testcase.status_id === 2,
  );
  const failedTestcases = submission.testcases.filter(
    (testcase: { status_id: number }) => testcase.status_id !== 3,
  );

  if (pendingTestcases.length === 0) {
    const accepted = failedTestcases.length === 0;
    submission = await db.submission.update({
      where: {
        id: submission.id,
      },
      data: {
        status: accepted ? "AC" : "REJECTED",
        time: Math.max(
          ...submission.testcases.map((testcase: { time: any }) =>
            Number(testcase.time || "0"),
          ),
        ),
        memory: Math.max(
          ...submission.testcases.map(
            (testcase: { memory: any }) => testcase.memory || 0,
          ),
        ),
      },
      include: {
        problem: true,
        activeContest: true,
        testcases: true,
      },
    });
  }
}

export async function updateContest(submission: SubmissionWithTestcases) {
  var contestSubmission = await db.submission.findUnique({
    where: {
      id: submission.id,
    },
    include: {
      activeContest: true,
      problem: true,
    },
  });
  if (
    !contestSubmission ||
    !contestSubmission.activeContestId ||
    !contestSubmission.activeContest?.startTime ||
    !submission.activeContestId
  )
    return;

  const points = await getPoints(
    contestSubmission.problem.difficulty,
    contestSubmission.activeContest?.startTime,
    contestSubmission.activeContest?.endTime,
  );

  await db.contestSubmission.upsert({
    where: {
      userId_problemId_contestId: {
        contestId: submission.activeContestId,
        userId: submission.userId,
        problemId: submission.problemId,
      },
    },
    create: {
      submissionId: submission.id,
      userId: submission.userId,
      problemId: submission.problemId,
      contestId: submission.activeContestId,
      points,
    },
    update: {
      points,
    },
  });
}
