import React, {useState, useEffect, useRef} from "react";
import Head from "next/head";
import {dataSource} from '@/services/data_source_dummy';
import {Story} from "@/models/story";
import {Suggestion} from "@/models/suggestion";
import {Post} from "@/models/post";


export default function Home() {
    const [stories, setStories] = useState<Story[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [activeStory, setActiveStory] = useState<Story | null>(null); // DOM에 렌더링될 스토리 (퇴장 애니메이션을 위해)
    const [isCardVisible, setIsCardVisible] = useState(false); // 카드의 opacity와 transform을 제어
    const [hoverPosition, setHoverPosition] = useState<{ top: number; left: number } | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // useEffect를 사용하여 컴포넌트가 처음 마운트될 때만 데이터를 가져옵니다.
    // 이렇게 하지 않으면 렌더링마다 데이터 요청이 반복되어 무한 루프가 발생합니다.
    useEffect(() => {
        dataSource.getUserData("03k03h03j").then((user) => {
                setStories(user.stories);
                setSuggestions(user.suggestions);
                setPosts(user.posts);
            }
        );
    }, []);

    const handleStoryEnter = (e: React.MouseEvent<HTMLDivElement>, story: Story) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const storyElement = e.currentTarget;
        const mainElement = storyElement.closest('main');
        if (!mainElement) return;

        const storyRect = storyElement.getBoundingClientRect();
        const mainRect = mainElement.getBoundingClientRect();

        setActiveStory(story);
        setHoverPosition({
            top: storyRect.bottom - mainRect.top + 10, // 10px gap
            left: storyRect.left - mainRect.left + storyRect.width / 2,
        });

        // DOM에 카드가 렌더링된 후 애니메이션을 시작합니다.
        timeoutRef.current = setTimeout(() => {
            setIsCardVisible(true);
        }, 50);
    };

    const handleStoryLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // 사용자가 카드로 마우스를 옮길 시간을 주기 위해 지연을 둡니다.
        timeoutRef.current = setTimeout(() => {
            setIsCardVisible(false);
            // 퇴장 애니메이션이 끝난 후 DOM에서 카드를 제거합니다.
            timeoutRef.current = setTimeout(() => {
                setActiveStory(null);
            }, 200); // CSS transition 시간과 일치
        }, 300);
    };

    return (
        <>
            <Head>
                <title>Instagram UI Clone</title>
            </Head>
            <div style={{background: "#fafafa", minHeight: "100vh", color: "#262626"}}>
                <header
                    style={{
                        background: "#fff",
                        borderBottom: "1px solid #dbdbdb",
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 0",
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                    }}
                >
                    <div style={{
                        maxWidth: 935,
                        width: '100%',
                        margin: "0 auto",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <div style={{flex: 1}}>
                            <img src="/instagram-logo.png" alt="Instagram" style={{height: 30}}/>
                        </div>
                        <input
                            type="text"
                            placeholder="검색"
                            style={{
                                background: "#efefef",
                                border: 0,
                                borderRadius: 6,
                                padding: "5px 12px",
                                width: 268,
                                fontSize: 14,
                            }}
                        />
                        <div style={{flex: 1, display: "flex", justifyContent: "flex-end", gap: 16}}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                       width="24px" fill="#262626"><path
                                d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                       width="24px" fill="#262626"><path
                                d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                       width="24px" fill="#262626"><path
                                d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                       width="24px" fill="#262626"><path
                                d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"/></svg></span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                       width="24px" fill="#262626"><path
                                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></span>
                            <img src="/profile.jpg" alt="profile" style={{width: 26, height: 26, borderRadius: "50%"}}/>
                        </div>
                    </div>
                </header>
                <div style={{
                    maxWidth: 935,
                    width: '100%',
                    margin: "32px auto 0 auto",
                    padding: "0 20px",
                    display: "flex",
                    gap: 32
                }}>
                    {/* Main feed */}
                    <main style={{flex: 2.1, maxWidth: 614, position: 'relative'}}>
                        {/* Stories */}
                        <section style={{
                            background: "#fff",
                            border: "1px solid #dbdbdb",
                            borderRadius: 3,
                            padding: 16,
                            display: "flex",
                            gap: 20,
                            marginBottom: 24,
                            overflowX: "auto",
                        }}>
                            {stories.map((story) => (
                                <div
                                    key={story.id}
                                    style={{textAlign: 'center', flexShrink: 0}}
                                    onMouseEnter={(e) => handleStoryEnter(e, story)}
                                    onMouseLeave={handleStoryLeave}
                                >
                                    <div
                                        onClick={() => alert(`Viewing story of ${story.name}`)}
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        <div
                                            style={{

                                                width: 62, // 전체 원 크기
                                                height: 62,
                                                borderRadius: "50%",
                                                padding: 3, // gradient와 흰색 사이 여백
                                                background: "conic-gradient(#c13584, #e1306c, #f77737, #fcaf45, #f77737, #e1306c, #c13584)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                margin: "0 auto",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: "50%",
                                                    background: "#fff", // 흰색 원(사진과 gradient 사이)
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <img
                                                    src={story.img}
                                                    alt={story.name}
                                                    style={{
                                                        width: 56,
                                                        height: 56,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{
                                            fontSize: 12,
                                            marginTop: 6,
                                            maxWidth: 62,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>{story.name}</div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        {/* Posts */}
                        {posts.map((post, idx) => (
                            <section
                                key={idx}
                                style={{
                                    background: "#fff",
                                    border: "1px solid #dbdbdb",
                                    borderRadius: 3,
                                    marginBottom: 24,
                                }}
                            >
                                <div style={{display: "flex", alignItems: "center", padding: "14px 16px"}}>
                                    <img src="/profile.jpg" alt={post.user}
                                         style={{width: 32, height: 32, borderRadius: "50%"}}/>
                                    <span style={{marginLeft: 12, fontWeight: 600}}>{post.user}</span>
                                    <span style={{marginLeft: "auto"}}><svg xmlns="http://www.w3.org/2000/svg"
                                                                            height="24px" viewBox="0 -960 960 960"
                                                                            width="24px" fill="#262626"><path
                                        d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg></span>
                                </div>
                                <img src={post.img} alt="post"
                                     style={{width: "100%", maxHeight: 614, objectFit: "cover"}}/>
                                <div style={{padding: "8px 16px"}}>
                                    <div style={{display: "flex", gap: 16, fontSize: 22}}>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                                   viewBox="0 -960 960 960" width="24px" fill="#FFFFF"><path
                                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></span>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                                   viewBox="0 -960 960 960" width="24px" fill="#FFFFF"><path
                                            d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"/></svg></span>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                                   viewBox="0 -960 960 960" width="24px" fill="#FFFFF"><path
                                            d="m397-115-99-184-184-99 71-70 145 25 102-102-317-135 84-86 385 68 124-124q23-23 57-23t57 23q23 23 23 56.5T822-709L697-584l68 384-85 85-136-317-102 102 26 144-71 71Z"/></svg></span>
                                    </div>
                                    <div style={{
                                        marginTop: 6,
                                        fontSize: 14,
                                        fontFamily: "'Pretendard', Arial, sans-serif"
                                    }}>
                                        <b>{post.likedBy}</b>님 외 여러 명이 좋아합니다
                                    </div>
                                    <div style={{marginTop: 6}}>
                                        <b>matheus_knaak</b> {post.text}
                                    </div>
                                    <div style={{
                                        color: "#8e8e8e",
                                        marginTop: 4,
                                        fontSize: 14,
                                        fontFamily: "'Pretendard', Arial, sans-serif"
                                    }}>댓글 45개 모두 보기
                                    </div>
                                    {post.comments.map((c, i) => (
                                        <div key={i} style={{fontSize: 14}}>
                                            <b>{c.user}</b> {c.text}
                                        </div>
                                    ))}
                                    <div style={{color: "#8e8e8e", fontSize: 12, marginTop: 4}}>14 h</div>
                                </div>
                                <div style={{
                                    borderTop: "1px solid #efefef",
                                    padding: "8px 16px",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <input
                                        type="text"
                                        placeholder="댓글 달기..."
                                        style={{
                                            border: "none",
                                            background: "none",
                                            flex: 1,
                                            fontSize: 14,
                                            outline: "none",
                                        }}
                                    />
                                    <button style={{
                                        background: "none",
                                        border: "none",
                                        color: "#0095f6",
                                        fontWeight: 600
                                    }}>게시
                                    </button>
                                </div>
                            </section>
                        ))}
                        {/* Hover Card - Rendered outside the scrolling section for correct positioning */}
                        {activeStory && hoverPosition && (
                            <div // 퇴장 애니메이션을 위해 activeStory가 있을 때 렌더링
                                style={{
                                    position: 'absolute',
                                    top: `${hoverPosition.top}px`,
                                    left: `${hoverPosition.left}px`,
                                    width: '260px',
                                    backgroundColor: 'white',
                                    borderRadius: '6px',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.15)',
                                    zIndex: 10,
                                    padding: '16px',
                                    textAlign: 'left',
                                    // Animation styles
                                    opacity: isCardVisible ? 1 : 0,
                                    transform: `translateX(-50%) ${isCardVisible ? 'translateY(0)' : 'translateY(-10px)'}`,
                                    transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out',
                                }}
                                onMouseEnter={() => {
                                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                }}
                                onMouseLeave={handleStoryLeave}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '12px'
                                }}>
                                    <img src={activeStory.img} alt={activeStory.name}
                                         style={{width: '56px', height: '56px', borderRadius: '50%'}}/>
                                    <div>
                                        <div style={{fontWeight: 600, fontSize: '14px'}}>{activeStory.name}</div>
                                        <div style={{color: '#8e8e8e', fontSize: '14px'}}>{activeStory.name}</div>
                                    </div>
                                </div>
                                <button style={{
                                    width: '100%',
                                    padding: '8px', border: 'none', borderRadius: '8px', backgroundColor: '#0095f6',
                                    color: 'white', fontWeight: 600, cursor: 'pointer'
                                }}>
                                    Follow
                                </button>
                            </div>
                        )}
                    </main>
                    {/* Sidebar */}
                    <aside style={{flex: 1}}>
                        <div style={{display: "flex", alignItems: "center", marginBottom: 24}}>
                            <img src="/profile.jpg" alt="profile" style={{width: 56, height: 56, borderRadius: "50%"}}/>
                            <div style={{marginLeft: 14}}>
                                <div style={{fontWeight: 600}}>marksousaweb</div>
                                <div style={{color: "#8e8e8e", fontSize: 14}}>Mark Sousa | Design Web</div>
                            </div>
                            <button style={{
                                marginLeft: "auto",
                                color: "#0095f6",
                                background: "none",
                                border: "none",
                                fontWeight: 600
                            }}>전환
                            </button>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
                            <div style={{
                                color: "#8e8e8e",
                                fontWeight: 600,
                                fontSize: 14,
                                fontFamily: "'Pretendard', Arial, sans-serif"
                            }}>회원님을 위한 추천
                            </div>
                            <button style={{
                                background: "none",
                                border: "none",
                                color: "#262626",
                                fontWeight: 600,
                                fontSize: 12
                            }}>모두 보기
                            </button>
                        </div>
                        {suggestions.map((sug, i) => (
                            <div key={i} style={{display: "flex", alignItems: "center", marginBottom: 10}}>
                                <img src="/profile.jpg" alt={sug.name}
                                     style={{width: 32, height: 32, borderRadius: "50%"}}/>
                                <div style={{marginLeft: 14}}>
                                    <div style={{fontWeight: 600, fontSize: 14}}>{sug.name}</div>
                                    <div style={{
                                        color: "#8e8e8e",
                                        fontSize: 13,
                                        fontFamily: "'Pretendard', Arial, sans-serif"
                                    }}>회원님을 위한 추천
                                    </div>
                                </div>
                                <button style={{
                                    marginLeft: "auto",
                                    color: "#0095f6",
                                    background: "none",
                                    border: "none",
                                    fontWeight: 600,
                                    fontSize: 12
                                }}>팔로우
                                </button>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </>
    );
}