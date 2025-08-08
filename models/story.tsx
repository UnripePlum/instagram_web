export class Story {
    name: string;
    id: string;
    img: string;
    storyId: string;
    isViewed: boolean;

    constructor(name: string, id: string, img: string, storyId: string, isViewed: boolean) {
        this.name = name;
        this.id = id;
        this.img = img;
        this.storyId = storyId;
        this.isViewed = isViewed;
    }
}