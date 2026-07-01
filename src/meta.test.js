import { describe, it, expect } from "vitest";
import { execSync } from "child_process";

describe("meta", () => {
  function playwrightVersionFromPackageJson() {
    const output = execSync(
      "node_modules/.bin/playwright --version",
    ).toString();
    const version = output.match(/Version (\d+\.\d+.\d+)/)[1];
    return version;
  }

  function findDockerPlaywrightReferences() {
    const output = execSync(
      "git ls-files | xargs grep --line-number --extended-regexp mcr\.microsoft\.com/playwright",
    )
      .toString()
      .trim();

    return output.split("\n");
  }

  it("should reference the same version of Playwright everywhere", () => {
    const expectedPlaywrightVersion = playwrightVersionFromPackageJson();
    expect(expectedPlaywrightVersion).toBeTypeOf("string");

    const otherReferences = findDockerPlaywrightReferences();

    for (const reference of otherReferences) {
      expect(
        reference,
        "When updating playwright, make sure to go manually update all of the Docker referencences to use the same version too",
      ).toContain(expectedPlaywrightVersion);
    }
  });
});
