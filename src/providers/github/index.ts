import { Octokit } from "@octokit/rest";

class Github {
    octokit:Octokit=new Octokit;
    dir:string = ""
    repo:{owner:string,repo:string}
    constructor({auth,dir,repo}:{auth:string,dir:string,repo:{owner:string,repo:string}}){
        this.dir = dir
        this.repo = repo
        this.create({auth})
    }
    async create({auth}:{auth:string}){
        this.octokit = new Octokit({
            auth
        });
    }
    async getUserInfo(){
        const { data:raw } = await this.octokit.request("/user");
        var data = {
            login:raw.login,
            avatar:raw.avatar_url,
            name:raw.name,
            company:raw.company,
            blog:raw.blog,
            location:raw.location,
            email:raw.email,
            hireable:raw.hireable,
            bio:raw.bio,
            publicRepos:raw.public_repos,
            diskUsage:raw.disk_usage,
            privateRepos:raw.total_private_repos,
            plan:raw.plan.name
        }
        return data
    }
    async getIssues(){
        const {data:raw} = await this.octokit.issues.listForRepo({
            owner:this.repo.owner,
            repo:this.repo.repo,
        });
        const data = raw.map(this.parseIssue.bind(this))
        return data
    }
    async getPullRequests(){
        const {data:raw} = await this.octokit.pulls.list({
            owner:this.repo.owner,
            repo:this.repo.repo,
        });
        const data = raw.map(this.parsePullRequest.bind(this))
        return data
    }
    async getPullRequest({prNumber}:{prNumber:number}){
      const {data:raw} = await this.octokit.pulls.get({
          owner:this.repo.owner,
          repo:this.repo.repo,
          pull_number:prNumber
      });
      const data = this.parsePullRequest(raw)
      return data
    }
    async getPullRequestComments({prNumber}:{prNumber:number}){
      const {data:issueComments} = await this.octokit.issues.listComments({
          owner:this.repo.owner,
          repo:this.repo.repo,
          issue_number:prNumber
      });
      const {data:prComments} = await this.octokit.pulls.listComments({
          owner:this.repo.owner,
          repo:this.repo.repo,
          pull_number:prNumber
      });
      const raw = [...issueComments,...prComments]
      let data = raw.map(this.parseComment.bind(this))
                    .slice()
                    .sort((a, b) => a.createdDate.valueOf() - b.createdDate.valueOf())
      return data
    }
    async getIssue({issueNumber}:{issueNumber:number}){
      const {data:raw} = await this.octokit.issues.get({
          owner:this.repo.owner,
          repo:this.repo.repo,
          issue_number:issueNumber
      });
      return this.parseIssue(raw)
    }
    async getIssueComments({issueNumber}:{issueNumber:number}){
      const {data:raw} = await this.octokit.issues.listComments({
          owner:this.repo.owner,
          repo:this.repo.repo,
          issue_number:issueNumber
      });
      return raw.map(this.parseComment.bind(this))
    }
    async createComment({issueNumber,body}:{issueNumber:number,body:string}){
      const {data:raw} = await this.octokit.issues.createComment({
          owner:this.repo.owner,
          repo:this.repo.repo,
          issue_number:issueNumber,
          body
      });
      return raw
    }
    private parseIssue(issue:{
        title:string,
        id:number,
        node_id:string,
        number:number,
        user:any,
        labels:any,
        state:string,
        locked:boolean,
        assignees:any,
        milestone:any,
        comments:number,
        created_at:string,
        updated_at:string,
        closed_at:string|null,
        body:string
    }){
      return {
          title:issue.title,
          id:issue.id,
          altId:issue.node_id,
          number:issue.number,
          creator:this.parseUser(issue.user),
          labels:issue.labels.map(this.parseLabel),
          state:issue.state,
          locked:issue.locked,
          assignees:issue.assignees.map(this.parseUser),
          //  FIXME: parse milestone if neccessary
          milestone:issue.milestone,
          commentsAmount:issue.comments,
          createdDate:new Date(issue.created_at),
          updatedDate:new Date(issue.updated_at),
          closedDate:issue.closed_at  ? new Date(issue.closed_at||"") : null,
          body:issue.body
      }
    }
    private parsePullRequest(pr:{
        title:string,
        id:number,
        node_id:string,
        number:number,
        user:any,
        labels:any,
        state:string,
        locked:boolean,
        assignees:any,
        milestone:any,
        created_at:string,
        updated_at:string,
        closed_at:string|null,
        merged_at:string|null,
        merge_commit_sha:string|null,
        body:string,
        html_url:string,
        diff_url:string,
        requested_reviewers:any,
        requested_teams:any,
        head:any,
        base:any
    }){
      return {
          title:pr.title,
          id:pr.id,
          altId:pr.node_id,
          number:pr.number,
          creator:this.parseUser(pr.user),
          labels:pr.labels.map(this.parseLabel),
          state:pr.state,
          locked:pr.locked,
          assignees:pr.assignees.map(this.parseUser),
          //  FIXME: parse milestone if neccessary
          milestone:pr.milestone,
          createdDate:new Date(pr.created_at),
          updatedDate:new Date(pr.updated_at),
          closedDate:pr.closed_at  ? new Date(pr.closed_at||"") : null,
          mergedDate:pr.merged_at  ? new Date(pr.merged_at||"") : null,
          mergeCommitSHA:pr.merge_commit_sha,
          body:pr.body,
          url:pr.html_url,
          diffUrl:pr.diff_url,
          reviewers:pr.requested_reviewers.map(this.parseUser),
          reviewTeams:pr.requested_teams.map(this.parseTeam),
          head:{
            label:pr.head.label,
            ref:pr.head.ref,
            sha:pr.head.sha,
            user:this.parseUser(pr.head.user),
            repo:this.parseRepo(pr.head.repo)
          },
          base:{
            label:pr.base.label,
            ref:pr.base.ref,
            sha:pr.base.sha,
            user:this.parseUser(pr.base.user),
            repo:this.parseRepo(pr.base.repo)
          },
      }
    }
    private parseUser(user:{login:string,id:number,node_id:string,avatar_url:string,html_url:string}){
        return {
            login:user.login,
            id:user.id,
            altId:user.node_id,
            avatar:user.avatar_url,
            url:user.html_url
        }
    }
    private parseLabel(label:{id:number,node_id:string,name:string,color:string,default:boolean,description:string}){
        return {
            name:label.name,
            id:label.id,
            altId:label.node_id,
            color:label.color,
            description:label.description
        }
    }
    private parseComment(comment:{html_url:string,id:number,node_id:string,user:any,created_at:string,updated_at:string,body:string}){
      return {
        url:comment.html_url,
        id:comment.id,
        altId:comment.node_id,
        creator:this.parseUser(comment.user),
        createdDate:new Date(comment.created_at),
        updatedDate:new Date(comment.updated_at),
        body:comment.body
      }
    }
    private parseTeam(team:{id:number,node_id:string,html_url:string,name:string,slug:string,description:string}){
      return {
        url:team.html_url,
        id:team.id,
        altId:team.node_id,
        name:team.name,
        slug:team.slug,
        description:team.description
      }
    }
    private parseRepo(r:{
      id:number,
      node_id:string,
      name:string,
      full_name:string,
      owner:any,
      private:boolean,
      html_url:string,
      description:string,
      fork:boolean,
      git_url:string,
      ssh_url:string,
      clone_url:string,
      mirror_url:string,
      homepage:string,
      language:string|null,
      forks_count:number,
      stargazers_count:number,
      watchers_count:number,
      size:number,
      default_branch:string,
      open_issues_count:number,
      topics:string[],
      has_issues:boolean,
      has_projects:boolean,
      has_wiki:boolean,
      has_pages:boolean,
      has_downloads:boolean,
      archived:boolean,
      disabled:boolean,
      visibility:string,
      pushed_at:string|null,
      created_at:string,
      updated_at:string,
      allow_rebase_merge:boolean,
      allow_squash_merge:boolean,
      allow_merge_commit:boolean,
      temp_clone_token:string
    }){
      return {
        id:r.id,
        altId:r.node_id,
        name:r.name,
        repoName:r.full_name,
        owner:this.parseUser(r.owner),
        private:r.private,
        url:r.html_url,
        description:r.description,
        fork:r.fork,
        gitUrl:r.git_url,
        sshUrl:r.ssh_url,
        cloneUrl:r.clone_url,
        mirrorUrl:r.mirror_url,
        homepage:r.homepage,
        language:r.language,
        forks:r.forks_count,
        stars:r.stargazers_count,
        watchers:r.watchers_count,
        size:r.size,
        defaultBranch:r.default_branch,
        openIssues:r.open_issues_count,
        topics:r.topics,
        capabilities:{
          issues:r.has_issues,
          projects:r.has_projects,
          wiki:r.has_wiki,
          pages:r.has_pages,
          downloads:r.has_downloads
        },
        archived:r.archived,
        disabled:r.disabled,
        visibility:r.visibility,
        pushedDate:r.pushed_at  ? new Date(r.pushed_at||"") : null,
        createdDate:new Date(r.created_at),
        updatedDate:new Date(r.updated_at),
        allowedMergeTypes:{
          rebase:r.allow_rebase_merge,
          squash:r.allow_squash_merge,
          commit:r.allow_merge_commit
        },
        tempCloneToken:r.temp_clone_token
      }
    }
}
export default Github
