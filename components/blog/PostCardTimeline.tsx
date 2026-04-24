import { Post } from "contentlayer/generated";
import Link from "next/link";
import { getCategoryHref, getPostCategory } from "utils/categories";
import { formatPostDate } from "utils/dates";

export default function PostTimelineCard(post: Post) {
    return (
        <>
        <li>
            <hr />
            <div className="timeline-start">
                <time dateTime={post.created} className="text-xs text-gray-600">
                    {formatPostDate(post.created)}
                </time>
            </div>
            <div className="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                </svg>
            </div>
            <div className="timeline-end timeline-box transition-colors hover:bg-base-200/60">
                <Link className="hover:underline" href={post.url}>{post.title}</Link>
                <div className="mt-1 text-xs text-gray-600">
                    <Link className="link link-hover" href={getCategoryHref(post)}>
                        {getPostCategory(post)}
                    </Link>
                </div>
            </div>
            <hr />
        </li>
        </>
    );
}
