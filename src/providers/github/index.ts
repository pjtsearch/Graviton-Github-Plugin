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
    async getIssue({issueNumber}){
      const {data:raw} = await this.octokit.issues.get({
          owner:this.repo.owner,
          repo:this.repo.repo,
          issue_number:issueNumber
      });
      return this.parseIssue(raw)
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
}
export default Github
