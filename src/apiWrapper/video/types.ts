type CommentAuthor = {
    id: string,
    username: string,
    profilePictureUrl?: string
}

export type Comment = {
    id: string,
    content: string,
    sentBy: CommentAuthor,
    sentAt: Date,
    relatedVideo: string
}
