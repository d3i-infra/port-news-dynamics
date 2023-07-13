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
            datapoints.append((item.get("Date", None), item.get("Link", None)))

        out = pd.DataFrame(datapoints, columns=["Date", "Url"])
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
            datapoints.append((item.get("Date", None), item.get("Link", None)))

        out = pd.DataFrame(datapoints, columns=["Date", "Url"])
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
            datapoints.append((item.get("Date", None), item.get("UserName", None)))

        out = pd.DataFrame(datapoints, columns=["Date", "Username"])
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
            datapoints.append((item.get("Date", None), item.get("Link", None)))

        out = pd.DataFrame(datapoints, columns=["Date", "Url"])
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
                item.get("SearchTerm", None)
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Search Term"])
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
                item.get("SharedContent", None),
                item.get("Link", None),
                item.get("Method", None)
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Shared Content", "Url", "Method"])
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
                item.get("Comment", None)
            ))

        out = pd.DataFrame(datapoints, columns=["Date", "Comment"])
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
        for k, v in history.items():
            datapoints.append((
                k,
                v.get("Link", ""),
                v.get("WatchTime", "")
            ))

        out = pd.DataFrame(datapoints, columns=["Id", "Link", "Date"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out
