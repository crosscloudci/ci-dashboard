# specs / gitlab issues
https://gitlab.vulk.coop/cncf/ci-dashboard/issues/4
# mindmaps
https://www.mindomo.com/mindmap/05e04a9be4b14ef3b325119dabfae2ff
# mockups
https://github.com/cncf/cross-cloud/blob/master/DASHBOARD.md


# Where is the list of active of projects?

5. Go to gitlab cross-project .gitlab-ci.yml. eg. https://gitlab.cncf.ci/cncf/cross-project/raw/master/.gitlab-ci.yml.  The list of active projects will be listed with a URL for the project in gitlab

# How do I match the list of projects to a pipeline

* Query the project via the gitlab API to get the pipeline for that project.  Only 1 pipeline per project

# How do I match the list of projects to a job

* Get the pipeline for a project via the API
* Get the jobs for the pipeline

# Which branch should I use?

* From https://gitlab.ii.coop/cncf/cross-cloud/issues/268#note_3648

* Head = Master (eg. commit on master branch)
* Stable => tagged as release 
  * latest commit on a release tag eg. https://github.com/kubernetes/kubernetes/commit/4bc5e7f9a6c25dc4c03d4d656f2cefd21540e28c

# Where is the list of active cloud-providers?

* Cross-cloud .gitlab-ci.yml eg. https://gitlab.cncf.ci/cncf/cross-cloud/raw/master/.gitlab-ci.yml

Example config:

active-clouds:
- aws
- packet
- gke
- gce

# How can you tell what cloud a job is for?

* found as meta-data on the job for a project
* Currently only available as name of job eg. aws_coredns_deploy is for cloud-provider AWS, project coredns, and job type deploy.

* We will update the CI pipeline to include the cloud provider name in the meta-data for the job.  

Note: This should only be showing for deploy jobs. Not builds.

pipelines are configured in https://gitlab.cncf.ci/cncf/cross-cloud/blob/ci-stable-v0.1.0/.gitlab-ci.yml

Example of a passing pipeline for cross-cloud DEPLOYMENTS: https://gitlab.cncf.ci/cncf/cross-cloud/pipelines/2190

Example of job for deployment of coredns on AWS https://gitlab.cncf.ci/cncf/cross-cloud/-/jobs/25473

# API

1. projects
  * project id,  name
2. clouds
  * cloud id, name
3. pipelines
  * pipeline id, project_id, status, stable_tag, head_commit
4. jobs
  * pipeline id, project_id, job_id, cloud_id, status 
5. job_tooltips 
  * job_id tooltip
6. dashboard

# dashboard (full retrieve of json)
example of data with multiple records in each, in one json

```
{
   "clouds":[
      {
         "cloud_id":1,
         "name":"cloud 1"
      },
      {
         "cloud_id":2,
         "name":"cloud 2"
      }
   ],
   "projects":[
      {
         "project_id":1,
         "name":"hello project",
         "pipelines":[
            {
               "pipeline_id":1,
               "project_id":1,
               "status":"successful",
               "stable_tag":"release",
               "head_commit":"2342342342343243sdfsdfsdfs",
               "jobs":[
                  {
                     "pipeline_id":1,
                     "project_id":1,
                     "job_id":23,
                     "cloud_id":1,
                     "status":"fail"
                  },
                  {
                     "pipeline_id":1,
                     "project_id":1,
                     "job_id":24,
                     "cloud_id":2,
                     "status":"success"
                  }
               ]
            },
            {
               "pipeline_id":2,
               "project_id":1,
               "status":"successful",
               "stable_tag":"release",
               "head_commit":"2342342342343243sdfsdfsdfs",
               "jobs":[
                  {
                     "pipeline_id":2,
                     "project_id":1,
                     "job_id":23,
                     "cloud_id":1,
                     "status":"fail"
                  }
               ]
            }
         ]
      },
      {
         "project_id":2,
         "name":"hello second project",
         "pipelines":[
            {
               "pipeline_id":1,
               "project_id":2,
               "status":"successful",
               "stable_tag":"release",
               "head_commit":"2342342342343243sdfsdfsdfs",
               "jobs":[
                  {
                     "pipeline_id":1,
                     "project_id":2,
                     "job_id":26,
                     "cloud_id":1,
                     "status":"fail"
                  },
                  {
                     "pipeline_id":1,
                     "project_id":2,
                     "job_id":27,
                     "cloud_id":2,
                     "status":"success"
                  }
               ]
            },
            {
               "pipeline_id":2,
               "project_id":2,
               "status":"successful",
               "stable_tag":"release",
               "head_commit":"2342342342343243sdfsdfsdfs",
               "jobs":[
                  {
                     "pipeline_id":2,
                     "project_id":2,
                     "job_id":29,
                     "cloud_id":1,
                     "status":"fail"
                  }
               ]
            }
         ]
      }
   ]
}
```
