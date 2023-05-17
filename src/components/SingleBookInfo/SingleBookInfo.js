import "./SingleBookInfo.scss";

// libs
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import { fadeInVariant } from "../../pageVariants/variants";

// icons
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

// svgs
import FinishedBookVector from "../../assets/icons/done.svg";
import axios from "axios";

export default function SingleBookInfo({
  bookData: bookObject,
  isInShelf,
  token,
  triggerRerender,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleAddBook = async () => {
    const {
      name: book_name,
      description: book_description,
      genre: book_genre,
      author: book_author,
      total_pages,
      cover_image,
      id: book_id,
    } = bookObject;
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/books`,
        {
          book_name,
          book_description,
          book_genre,
          book_author,
          total_pages: total_pages === 0 ? 0 : total_pages,
          cover_image,
          is_NYT_best_seller: bookObject.is_NYT_best_seller ? 1 : 0,
          book_id: bookObject.is_NYT_best_seller ? book_id : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Success", {
        variant: "success",
        style: {
          backgroundColor: "#578C7A",
          height: "4rem",
          borderRadius: "18px",
        },
      });
      triggerRerender();
    } catch (err) {
      enqueueSnackbar("Failure", {
        variant: "error",
        style: {
          backgroundColor: "#eb4343",
          height: "4rem",
          borderRadius: "18px",
        },
      });
    }
  };
  if (!bookObject) {
    return <h1>Loading</h1>;
  }

  return (
    <motion.section
      className="book"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7 }}
    >
      <div className="book__heading">
        <h2 className="book__heading-text">Book Details:</h2>
      </div>
      <div className="book__info-card">
        <div className="book__left">
          <img
            src={bookObject.cover_image}
            className="book__cover-image"
            alt="book cover"
          />
          <div className="book__cta-wrapper">
            {bookObject.purchase_link !== "#" && (
              <span className="book__purchase">
                <Link className="book__amazon" to={bookObject.purchase_link}>
                  <ShoppingCartRoundedIcon className="book__purchase-icon" />
                  Purchase
                </Link>{" "}
                At{" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_960_181)">
                    <path
                      d="M21.6379 20.5915C21.7774 20.5357 21.8983 20.5218 22.0006 20.5497C22.1029 20.5776 22.154 20.6589 22.154 20.7938C22.154 20.9287 22.0843 21.0844 21.9448 21.2612C21.8239 21.41 21.6193 21.6123 21.3309 21.868C21.0426 22.1238 20.5985 22.44 19.9986 22.8167C19.3987 23.1934 18.743 23.5375 18.0315 23.8491C17.3201 24.1606 16.4458 24.4303 15.4088 24.6582C14.3718 24.8861 13.3045 25 12.207 25C11.1003 25 9.99351 24.8558 8.88674 24.5675C7.77997 24.2792 6.80805 23.9235 5.971 23.5003C5.13395 23.0771 4.33177 22.5935 3.56447 22.0494C2.79717 21.5053 2.18101 21.017 1.71598 20.5845C1.25095 20.1521 0.860323 19.7452 0.544102 19.3638C0.469698 19.2801 0.423195 19.2034 0.404593 19.1336C0.385992 19.0639 0.390642 19.0081 0.418544 18.9662C0.446446 18.9244 0.483648 18.8918 0.530151 18.8686C0.576654 18.8453 0.630133 18.836 0.690587 18.8407C0.751041 18.8453 0.804519 18.8663 0.851022 18.9035C2.63674 19.9916 4.03183 20.7636 5.03629 21.2193C8.65422 22.8562 12.3698 23.2747 16.1831 22.4749C17.9502 22.1029 19.7684 21.4751 21.6379 20.5915ZM24.5257 18.9872C24.628 19.136 24.6396 19.4592 24.5606 19.9568C24.4815 20.4543 24.349 20.931 24.163 21.3867C23.8467 22.1587 23.4515 22.7353 22.9771 23.1166C22.819 23.2468 22.6981 23.2887 22.6144 23.2422C22.5307 23.1957 22.5307 23.0841 22.6144 22.9074C22.8097 22.4888 23.0167 21.9238 23.2352 21.2123C23.4538 20.5008 23.484 20.0428 23.3259 19.8382C23.2794 19.7731 23.2073 19.7196 23.1097 19.6777C23.012 19.6359 22.8865 19.608 22.733 19.594C22.5795 19.5801 22.4424 19.5685 22.3214 19.5592C22.2005 19.5499 22.0378 19.5499 21.8332 19.5592C21.6286 19.5685 21.4821 19.5778 21.3937 19.5871C21.3054 19.5964 21.1612 19.6103 20.9612 19.6289C20.7613 19.6475 20.6566 19.6568 20.6473 19.6568C20.5915 19.6661 20.5311 19.6731 20.466 19.6777C20.4009 19.6824 20.3497 19.687 20.3125 19.6917C20.2753 19.6963 20.2358 19.701 20.1939 19.7056C20.1521 19.7103 20.1195 19.7126 20.0963 19.7126H19.9568L19.9149 19.7056L19.887 19.6847L19.8661 19.6429C19.8103 19.494 20.0289 19.308 20.5218 19.0848C21.0147 18.8616 21.4937 18.7221 21.9587 18.6663C22.3866 18.6012 22.8888 18.5965 23.4654 18.6523C24.0421 18.7081 24.3955 18.8198 24.5257 18.9872ZM19.029 12.8069C19.029 13.0952 19.0918 13.3929 19.2174 13.6998C19.3429 14.0067 19.4917 14.2764 19.6638 14.5089C19.8359 14.7414 20.0102 14.9554 20.187 15.1507C20.3637 15.346 20.5171 15.4948 20.6473 15.5971L20.8287 15.7506L17.6618 18.8756C17.2898 18.5314 16.9225 18.1803 16.5597 17.8223C16.197 17.4642 15.9273 17.1922 15.7506 17.0061L15.4855 16.7271C15.3832 16.6248 15.2669 16.4714 15.1367 16.2667C14.7833 16.8155 14.3299 17.2921 13.7765 17.6967C13.2231 18.1013 12.6302 18.3966 11.9978 18.5826C11.3653 18.7686 10.7143 18.8756 10.0447 18.9035C9.37502 18.9314 8.7356 18.8337 8.12641 18.6105C7.51722 18.3873 6.97081 18.0827 6.48718 17.6967C6.00355 17.3107 5.61758 16.7852 5.32926 16.1203C5.04094 15.4553 4.89678 14.6996 4.89678 13.8532C4.89678 13.072 5.02699 12.3558 5.28741 11.7048C5.54782 11.0538 5.88264 10.512 6.29187 10.0795C6.7011 9.64704 7.19635 9.26107 7.77764 8.9216C8.35893 8.58212 8.92859 8.31706 9.48662 8.1264C10.0447 7.93573 10.6492 7.7753 11.3002 7.64509C11.9513 7.51488 12.507 7.42885 12.9674 7.387C13.4278 7.34515 13.8905 7.31492 14.3555 7.29632V5.52455C14.3555 4.92001 14.2578 4.46894 14.0625 4.17132C13.7463 3.67839 13.1836 3.43192 12.3745 3.43192C12.3187 3.43192 12.2419 3.43657 12.1443 3.44587C12.0466 3.45517 11.8583 3.51097 11.5793 3.61328C11.3002 3.71559 11.0398 3.85277 10.798 4.02483C10.5562 4.19689 10.2958 4.47359 10.0168 4.85491C9.73774 5.23624 9.51453 5.68266 9.34712 6.1942L5.24555 5.81752C5.24555 5.25949 5.34786 4.7061 5.55247 4.15737C5.75709 3.60863 6.06866 3.08315 6.48718 2.58092C6.90571 2.07868 7.40794 1.6369 7.99388 1.25558C8.57982 0.874256 9.28434 0.569661 10.1074 0.341797C10.9305 0.113932 11.8164 0 12.7651 0C13.6951 0 14.5368 0.116257 15.2902 0.348772C16.0435 0.581287 16.6458 0.86728 17.0968 1.20675C17.5479 1.54622 17.9246 1.9322 18.2269 2.36468C18.5291 2.79715 18.7384 3.19708 18.8547 3.56445C18.9709 3.93183 19.029 4.27362 19.029 4.58984V12.8069ZM9.65404 13.0999C9.65404 13.8997 9.97956 14.5182 10.6306 14.9554C11.2444 15.3646 11.8908 15.4669 12.5698 15.2623C13.351 15.0298 13.8812 14.4578 14.1602 13.5463C14.2904 13.1278 14.3555 12.6581 14.3555 12.1373V9.87723C13.8068 9.89583 13.2906 9.95164 12.8069 10.0446C12.3233 10.1376 11.828 10.2934 11.3212 10.512C10.8143 10.7306 10.4097 11.0607 10.1074 11.5025C9.80517 11.9443 9.65404 12.4767 9.65404 13.0999Z"
                      fill="#F2831B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_960_181">
                      <rect width="25" height="25" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            )}
            {isInShelf ? (
              <Link to="/manage" className="book__manage">
                <ManageSearchIcon className="book__manage-icon" />
                Manage
              </Link>
            ) : (
              <button className="book__manage" onClick={handleAddBook}>
                <LibraryAddRoundedIcon className="book__manage-icon" />
                Add the book
              </button>
            )}
            <div className="book__progressbar-container">
              {isInShelf ? (
                <>
                  <p>
                    Progress: {bookObject.read_pages} / {bookObject.total_pages}{" "}
                    Pages
                  </p>
                  <CircularProgressbar
                    className="book__progressbar"
                    strokeWidth={50}
                    styles={buildStyles({
                     
                      strokeLinecap: "butt",
                      trailColor: "#f3f3f3e0",
                      pathColor:
                        +bookObject.read_pages === +bookObject.total_pages
                          ? `#578C7A`
                          : `rgba(105, 54, 245)`,
                    })}
                    value={
                      bookObject.total_pages === 0
                        ? 0
                        : (
                            (bookObject.read_pages / bookObject.total_pages) *
                            100
                          ).toFixed(0)
                    }
                  />
                </>
              ) : (
                <p>Progress: Not being added...</p>
              )}
            </div>
          </div>
        </div>
        <div className="book__right">
          <div className="book__content">
            <div className="book__criteria-wrapper">
              <h3 className="book__criteria">Book's Name:</h3>
              <p className="book__info-value">{bookObject.name}</p>
            </div>
            <div className="book__criteria-wrapper">
              <h3 className="book__criteria">Book's Author:</h3>
              <p className="book__info-value">{bookObject.author}</p>
            </div>
            <div className="book__criteria-wrapper">
              <h3 className="book__criteria">Book's Genre:</h3>
              <p className="book__info-value">{bookObject.genre}</p>
            </div>
            <div className="book__criteria-wrapper">
              <h3 className="book__criteria">Book's pages:</h3>
              <p className="book__info-value">{bookObject.total_pages}</p>
            </div>
          </div>
          <div className="book__content">
            {isInShelf && (
              <>
                <div className="book__criteria-wrapper">
                  <h3 className="book__criteria">Added At: </h3>
                  <p className="book__info-value">
                    {new Date(bookObject.add_date)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </p>
                </div>
                <div className="book__criteria-wrapper">
                  <h3 className="book__criteria">Updated At: </h3>
                  <p className="book__info-value">
                    {" "}
                    {new Date(bookObject.updated_at)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </p>
                </div>
              </>
            )}
            <div className="book__criteria-wrapper">
              <h3 className="book__criteria">Book's Description:</h3>
              <p className=" book__info-value-description">
                {bookObject.description}
              </p>
            </div>
          </div>
        </div>
        <div className="book__in-shelf">
          <h3>
            Status:{" "}
            <span
              className={
                isInShelf ? "book__in-shelf--true" : "book__in-shelf--false"
              }
            >
              {isInShelf ? "In shelf" : "Not in shelf"}
            </span>
          </h3>
        </div>
      </div>

      {bookObject.is_pending === 0 && (
        <div className="book__finished">
          <img
            src={FinishedBookVector}
            alt="finished book"
            className="book__finished-vector"
          />
        </div>
      )}
    </motion.section>
  );
}
