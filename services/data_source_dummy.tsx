import { DataSource } from './data_source';
import { User } from '@/models/User';
export class DataSourceDummy extends DataSource {
    private stories = [
        {name: "aurelio", img: "/story_dummy.jpg"},
        {name: "sarah", img: "/story_dummy.jpg"},
        {name: "vella", img: "/story_dummy.jpg"},
        {name: "peter", img: "/story_dummy.jpg"},
        {name: "lowell", img: "/story_dummy.jpg"},
        {name: "roy", img: "/story_dummy.jpg"},
    ];

    private suggestions = [
        {name: "jane_jacobs96"},
        {name: "aimee84"},
        {name: "jayda.adams72"},
        {name: "sterlingi97"},
        {name: "andreanem84"},
    ];

    private posts = [
        {
            user: "Lacy",
            img: "/cup.jpg",
            likedBy: "matheus_knaak",
            text: "É SÓ QUE VOCÊ QUER? 😏",
            comments: [
                {user: "matheus_knaak", text: "@lucaspetry_ 💪"},
                {user: "matheus_knaak", text: "sim 👑"},
            ],
        },
        {
            user: "Lowell",
            img: "/planet.jpg",
            likedBy: "matheus_knaak",
            text: "É SÓ QUE VOCÊ QUER? 😏",
            comments: [
                {user: "matheus_knaak", text: "@lucaspetry_ 💪"},
                {user: "matheus_knaak", text: "sim 👑"},
            ],
        },
    ];

    public async getUserData(user_id: string): Promise<User> {
        // Simulate a delay to mimic an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    new User(
                        user_id,
                        "03k03h03j",
                        "khjalk8625@gmail.com",
                        new Date("2023-01-01T00:00:00Z"),
                        this.stories.map((story, index) => ({
                            name: story.name,
                            id: `story_${index}`,
                            img: story.img,
                            storyId: `story_${index}`,
                            isViewed: false
                        })),
                        this.suggestions.map((suggestion, index) => ({
                            name: suggestion.name,
                            id: `suggestion_${index}`,
                            img: "/suggestion_dummy.jpg"
                        })),
                        this.posts.map((post, index) => ({
                            post_id: `post_${index}`,
                            user: post.user,
                            img: post.img,
                            likedBy: post.likedBy,
                            text: post.text,
                            comments: post.comments.map((comment, commentIndex) => ({
                                user: comment.user,
                                text: comment.text
                            }))
                        }))
                    ));
            }, 0);
        })
    }
}
export const dataSource = new DataSourceDummy();