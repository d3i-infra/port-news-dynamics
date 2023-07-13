"""
DDP tiktok module
"""

from pathlib import Path
from typing import Any
import logging
import zipfile

import pandas as pd

import port.unzipddp as unzipddp
from port.validate import (
    DDPCategory,
    StatusCode,
    ValidateInput,
    Language,
    DDPFiletype,
)

logger = logging.getLogger(__name__)

DDP_CATEGORIES = [
    DDPCategory(
        id="json_en",
        ddp_filetype=DDPFiletype.JSON,
        language=Language.EN,
        known_files=[
            "user_data.json"
        ],
    ),
    DDPCategory(
        id="text_file_json_en",
        ddp_filetype=DDPFiletype.JSON,
        language=Language.EN,
        known_files=[
            "user_data.json"
        ],
    )
]

STATUS_CODES = [
    StatusCode(id=0, description="Valid DDP", message=""),
    StatusCode(id=1, description="Not a valid DDP", message=""),
    StatusCode(id=2, description="Bad zip", message=""),
]

def validate(file: Path) -> ValidateInput:
    """
    Validates the input of a TikTok submission
    """

    validation = ValidateInput(STATUS_CODES, DDP_CATEGORIES)

    # submission was a zipfile
    try:
        paths = []
        with zipfile.ZipFile(file, "r") as zf:
            for f in zf.namelist():
                p = Path(f)
                if p.suffix in (".json"):
                    logger.debug("Found: %s in zip", p.name)
                    paths.append(p.name)

        validation.infer_ddp_category(paths)
        if validation.ddp_category.id is None:
            validation.set_status_code(1)
        else: 
            validation.set_status_code(0)

    # submission was something else
    except zipfile.BadZipFile:
        if file == "user_data.json":
            validation.set_ddp_category("text_file_json_en")
            validation.set_status_code(0)
        else:
            validation.set_status_code(2)

    return validation



def read_tiktok_file(tiktok_file: str, validation: ValidateInput) -> dict[Any, Any] | list[Any]:
    if validation.ddp_category.id == "text_file_json_en":
        out = unzipddp.read_json_from_file(tiktok_file)
    else:
        buf = unzipddp.extract_file_from_zip(tiktok_file, "user_data.json")
        out = unzipddp.read_json_from_bytes(buf)
    return out


   
def video_browsing_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Video Browsing History"].get("VideoList", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You watched a video", item.get("Link", None)))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract tiktok history: %s", e)

    return out


# Extract Favorite videos
def favorite_videos_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Favorite Videos"].get("FavoriteVideoList", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You favorited a video", ""))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


# Extract following
def following_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Following List"].get("Following", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You followed someone", ""))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


# Extract like VideoList
def like_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Like List"].get("ItemFavoriteList", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You liked a vide", ""))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


# Extract searchers
def search_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Search History"].get("SearchList", [])
        for item in history:
            datapoints.append((
                item.get("Date", None),
                "You searched a something",
                ""
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


# Extract share history
def share_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Share History"].get("ShareHistoryList", [])
        for item in history:
            datapoints.append((
                item.get("Date", None), 
                "You shared a video",
                ""
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


# Extract comments
def comment_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Comment"]["Comments"].get("CommentsList", [])
        for item in history:
            datapoints.append((
                item.get("Date", None), 
                "You posted a comment",
                ""
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out

# Extract watch live history
def watch_live_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Tiktok Live"]["Watch Live History"].get("WatchLiveMap", {})
        for _, v in history.items():
            datapoints.append((
                v.get("WatchTime", ""),
                "You watched a live stream",
                v.get("Link", "")
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


def create_activity_history(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:
    """
    Extacts all activities on tiktok with a timestamp

    TODO: CHECK IF ALL ACTIVITIES ARE COVERED
    """

    funs = [ 
        video_browsing_history_to_df,
        favorite_videos_to_df,
        following_to_df,
        like_to_df,
        search_history_to_df,
        share_history_to_df,
        comment_to_df,
        watch_live_history_to_df,
    ]

    dfs = [fun(tiktok_zip, validation) for fun in funs]
    dfs = [df for df in dfs if not df.empty]

    out = pd.concat(dfs, axis=0, ignore_index=True)
    out = out.sort_values(by="Date")

    return out
