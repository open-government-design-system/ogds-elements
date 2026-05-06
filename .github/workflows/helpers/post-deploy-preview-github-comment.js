export async function postComment({ github, context, core }) {
  const marker = "<!-- storybook-preview -->";
  const shortSha = context.payload.pull_request.head.sha.substring(0, 8);
  const now = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  const deploymentUrl = process.env.DEPLOYMENT_URL;
  const branch = context.payload.pull_request.head.ref;

  const body = [
    marker,
    `## Storybook Preview 👀`,
    ``,
    `- **Preview:** [Open Storybook PR Preview](${deploymentUrl})`,
    `- **Branch:** \`${branch}\``,
    `- **Latest Commit:** \`${shortSha}\``,
    `- **Updated:** ${now} (ET)`,
  ].join("\n");

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });
  const existing = comments.find((c) => c.body.includes(marker));

  if (existing) {
    await github.rest.issues.deleteComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: existing.id,
    });
  }

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body,
  });
}
