import pandas as pd
import requests
import re
import time
import random
from concurrent.futures import ThreadPoolExecutor
import json
import util


class PCSpider():
    def __init__(self, sec_name):
        self.sec_name = sec_name
        self.user_agent = [
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6",
            "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/19.77.34.5 Safari/537.1",
            "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24"
        ]
        self.headers = {
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "origin": "https://www.bilibili.com",
            "referer": "https://www.bilibili.com/video/BV1Z5411Y7or?from=search&seid=8575656932289970537",
            "cookie": "_uuid=DE8286F4-1D104-575A-C8D5-4210E91025577926219infoc; buvid3=AB261A13-3324-B385-455C-CFF1A9E5FB5484052infoc; sid=6eb5s39l; DedeUserID=281469075; DedeUserID__ckMd5=7b78dc14e0ec90ed; SESSDATA=800607c7%2C1714824237%2Ce2748%2Ab1CjAEl4Vh0qmzVaFNqYiYiO6DBQT32yB1VoS6dXV-xo1hnoh9gn2C2OmsVgmrinAxspUSVjdxcC1mTEVLZTc4Q1NTVWNHbHpvcExzbEN5MkM3akVQV1U5R1N0a096ZkU2bzNjWngzZEg3S05maU02SWplT21IaEhwSjgySjJBb0VWWmJRa2VGSnlnIIEC; bili_jct=299d3909b5a2ea1253a8ce1be95caedc; CURRENT_FNVAL=16; rpdid=|(J~k))m~J|k0J'uY)|Ym|m~Y; LIVE_BUVID=AUTO4315952457375679; CURRENT_QUALITY=80; bp_video_offset_501048197=417696779406748720; bp_t_offset_501048197=417696779406748720; PVID=2",
            "user-agent": random.choice(self.user_agent),
        }
        self.sec_url = f'https://www.bilibili.com/v/popular/rank/{sec_name}/'
        
    def get_page(self):
        response = requests.get(self.sec_url, headers=self.headers)
        assert response.status_code == 200, 'request failed'

        print(response.text)
        
        
if __name__ == '__main__':
    sec_name_list = ['bangumi']
    
    for sec_name in sec_name_list:
        spider = PCSpider(sec_name=sec_name)
        spider.get_page()
    
    
    