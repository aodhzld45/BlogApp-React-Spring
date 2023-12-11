// private String nickName;
// private String profileImage;
// private String writeDatetime;
// private String content;

export default interface CommentListItem {
    nickName : string,
    profileImage : string | null,
    writeDatetime : string,
    content : string,
}