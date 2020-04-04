const { Octokit } = require("@octokit/rest");


class Github {
    octokit;
    constructor({auth}){
        this.create({auth})
    }
    create({auth}){
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
}
module.exports = Github