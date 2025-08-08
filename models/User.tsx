import {Story} from "@/models/story";
import {Suggestion} from "@/models/suggestion";
import {Post} from "@/models/post";
import {Follower} from "@/models/follower";
import {Following} from "@/models/following";

export class User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    stories: Array<Story>;
    suggestions: Array<Suggestion>;
    posts: Array<Post>;
    followers: Array<Follower> = [];
    following: Array<Following> = [];

    constructor(id: string, name: string, email: string, createdAt: Date, stories: Array<Story>, suggestions: Array<Suggestion>, posts: Array<Post>, followers: Array<Follower> = [], following: Array<Following> = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.stories = stories;
        this.suggestions = suggestions;
        this.posts = posts;
        this.followers = followers;
        this.following = following;
    }
}

