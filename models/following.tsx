export class Following{
    name: string;
    id: string;
    img: string;
    isFollowing: boolean;

    constructor(name: string, id: string, img: string, isFollowing: boolean) {
        this.name = name;
        this.id = id;
        this.img = img;
        this.isFollowing = isFollowing;
    }
}