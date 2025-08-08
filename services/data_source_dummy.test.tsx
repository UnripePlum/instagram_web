import { DataSourceDummy } from './data_source_dummy';
import { User } from '@/models/User';

// Mock the abstract DataSource class. Since DataSourceDummy extends it,
// we need a base class for it to extend in the test environment.
// An empty class is sufficient here.
jest.mock('./data_source', () => {
    return {
        DataSource: class MockDataSource {}
    };
});

// Mock the User model. This isolates the test to the DataSourceDummy logic.
jest.mock('@/models/User', () => {
    return {
        User: class MockUser {
            constructor(
                public id: string,
                public username: string,
                public email: string,
                public createdAt: Date,
                public stories: any[],
                public suggestions: any[],
                public posts: any[]
            ) {}
        }
    };
});

describe('DataSourceDummy', () => {
    let dataSource: DataSourceDummy;

    beforeEach(() => {
        dataSource = new DataSourceDummy();
    });

    describe('getUserData', () => {
        it('should return user data with the correct structure and values for a given user_id', async () => {
            const testUserId = 'test_user_123';
            const userData = await dataSource.getUserData(testUserId);



            // We expect the result to be an instance of our mocked User class
            expect(userData).toBeInstanceOf(User);

            // Assertions for the top-level User properties
            expect(userData.id).toBe(testUserId);
            expect(userData.username).toBe('03k03h03j');
            expect(userData.email).toBe('khjalk8625@gmail.com');
            expect(userData.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'));

            // Assertions for stories array
            expect(userData.stories).toHaveLength(6);
            expect(userData.stories[0]).toEqual({
                name: 'aurelio',
                id: 'story_0',
                img: '/story_dummy.jpg',
                storyId: 'story_0',
                isViewed: false
            });

            // Assertions for suggestions array
            expect(userData.suggestions).toHaveLength(5);
            expect(userData.suggestions[0]).toEqual({
                name: 'jane_jacobs96',
                id: 'suggestion_0',
                img: '/suggestion_dummy.jpg'
            });

            // Assertions for posts array
            expect(userData.posts).toHaveLength(2);
            expect(userData.posts[0]).toEqual({
                post_id: 'post_0',
                user: 'Lacy',
                img: '/cup.jpg',
                likedBy: 'matheus_knaak',
                text: 'É SÓ QUE VOCÊ QUER? 😏',
                comments: [
                    { user: 'matheus_knaak', text: '@lucaspetry_ 💪' },
                    { user: 'matheus_knaak', text: 'sim 👑' },
                ],
            });
        });

        it('should correctly pass a different user_id to the user object', async () => {
            const anotherUserId = 'another_user_456';
            const userData = await dataSource.getUserData(anotherUserId);

            expect(userData.id).toBe(anotherUserId);
            // The rest of the data is static, so we can just do a sanity check
            expect(userData.username).toBe('03k03h03j');
        });
    });
});