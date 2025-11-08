import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const ShareButtons = ({ url, title }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-md px-4 py-2 flex gap-3 z-50 whitespace-nowrap">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;