import { translate } from "../utilities/locale";

export const addDefaultNameToJob = ({ intl, jobs, job }) => ({
  ...job,
  name: `${translate(intl, "postingDefaultName")}${getLastPostingNum({ jobs }) +
    1}`
});

const getLastPostingNum = ({ jobs }) => {
  //get last posting number
  let max = 0;

  Object.keys(jobs).forEach(jobId => {
    const jobNameSplit = jobs[jobId].name.split("#");

    if (jobNameSplit.length > 1) {
      const postingNum = parseInt(jobNameSplit[jobNameSplit.length - 1]);

      if (!isNaN(postingNum) && postingNum > max) max = postingNum;
    }
  });

  return max;
};
