export abstract class DataSource {
    public abstract getUserData(user_id:String): Promise<any>;
}