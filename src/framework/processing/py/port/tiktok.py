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
    StatusCode(id=3, description="Data conditions not met", message=""),
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
            datapoints.append((item.get("Date", None), "You watched a video", item.get("Link", None), None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((item.get("Date", None), "You favorited a video", item.get("Link", None), None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((item.get("Date", None), "You followed someone", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((item.get("Date", None), "You liked a video", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((item.get("Date", None), "You searched for something", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((item.get("Date", None), "You shared a video", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((item.get("Date", None), "You posted a comment", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
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
            datapoints.append((v.get("WatchTime", None), "You watched a live stream", v.get("Link", None), None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out

# Extract go live history
def go_live_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Tiktok Live"]["Go Live History"].get("GoLiveMap", {})
        for _, v in history.items():
            datapoints.append((v.get("GoTime", None), "You went live", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out

# Extract logging in history
def logging_in_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Activity"]["Login History"].get("LoginHistoryList", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You logged in", None, item.get("DeviceSystem", None), None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out


# Extract blocking history
def blocking_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["App Settings"]["Block"].get("BlockList", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You blocked someone", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out

# Extract chatting history
'''
Needs some adaption: list of dicts of single chat converstations
'''
def chat_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Direct Messages"]["Chat History"].get("ChatHistory", {})
        for _,chats in history.items():
            for chat in chats:
                datapoints.append((chat.get("Date", None), "You sent/received a private message", None, None, None))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
        
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out

# Extract posting history
def posting_history_to_df(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:

    d = read_tiktok_file(tiktok_zip, validation)
    datapoints = []
    out = pd.DataFrame()

    try: 
        history = d["Video"]["Videos"].get("VideoList", [])
        for item in history:
            datapoints.append((item.get("Date", None), "You posted a video", None, None, item.get("Likes", None)))

        out = pd.DataFrame(datapoints, columns=["Date", "Action", "Url", "OperatingSystem", "likes"])
    except Exception as e:
        logger.error("Could not extract: %s", e)

    return out

def create_activity_history(tiktok_zip: str, validation: ValidateInput) -> pd.DataFrame:
    """
    Extacts all activities on tiktok with a timestamp

    TODO: CHECK IF ALL ACTIVITIES ARE COVERED
    
    > one df or 4 different ones? - for simplicity one with sparse additional attributes?
    ACTIVITIES (timestamp, activity, video to link[watching & favourites & watch live], operating system[only logging in], likes[only video posted])
    - marked with x = done, v = works
    -----------------------------------------------------------------------
    - Watching (timestamp, "you watched a video", link to video, nan, nan) x v
    - Following (timestamp, "you followed someone", nan, nan, nan) x v
    - favorites (timestamp, "you favourited a video, link to video, nan, nan) x v
    - logging in (timestamp, "you logged in", nan, operating system, nan) x v
    - searching (timestamp, "you searched something", nan, nan, nan) x v
    - sharing (timestamp, "you shared something", nan, nan, nan) x v
    - blocking (timestamp, you clocked someone, nan, nan, nan) x v
    - commenting (timestamp, you commented something, nan, nan, nan) x v
    - chatting (timestamp, you chatted with someone, nan, nan, nan) x v
    - going live (timestamp, "you went live", nan, nan, nan) x ?
    . watching live streams (timestamp, "you watched a live stream", link, nan, nan) x v
    - posting videos (timestamp, "you posted a video", nan, nan, likes) x v
    
    
    """
    out = pd.DataFrame()

    funs = [ 
        video_browsing_history_to_df,
        favorite_videos_to_df,
        following_to_df,
        like_to_df,
        search_history_to_df,
        share_history_to_df,
        comment_to_df,
        watch_live_history_to_df,
        logging_in_to_df,
        blocking_history_to_df,
        chat_history_to_df,
        go_live_history_to_df,
        posting_history_to_df,
        
    ]

    dfs = [fun(tiktok_zip, validation) for fun in funs]
    dfs = [df for df in dfs if not df.empty]

    if len(dfs) > 0:
        out = pd.concat(dfs, axis=0, ignore_index=True)
        out = out.sort_values(by="Date")

        # Check conditions that need to meet
        # 5 of activity OR 200 single activities
        not_met_days_active_condition = len({date[:10] for date in out["Date"]}) <= 5
        not_met_number_of_entries_greater_than_200 = len(out) <= 200

        if not_met_days_active_condition or not_met_number_of_entries_greater_than_200:
            validation.set_status_code(3)
            out = pd.DataFrame()

    else:
        validation.set_status_code(3)

    return out
