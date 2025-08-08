export class Post{
    post_id: string;
    user: string;
    img: string;
    likedBy: string;
    text: string;
    comments: Array<{ user: string; text: string }>;

    constructor(post_id: string, user: string, img: string, likedBy: string, text: string, comments: Array<{ user: string; text: string }>) {
        this.post_id = post_id;
        this.user = user;
        this.img = img;
        this.likedBy = likedBy;
        this.text = text;
        this.comments = comments;
    }
}