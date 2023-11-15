import pandas as pd
import requests
import re
import time
import random
from concurrent.futures import ThreadPoolExecutor
import json
import util

class BulletSpider():
    def __init__(self, bv_name):
        self.bv_name = bv_name
        self.video_url = f'https://www.bilibili.com/video/{bv_name}'
        
    def get_cid(self):
        response = requests.get(self.video_url)
        assert response.status_code == 200, 'request failed'

        cid_group = None
        with ThreadPoolExecutor(max_workers=4) as executor:
            pattern = re.compile(r'(\d+-)*(\d+)(?=\.m4s)')
            if cid_group is None:
                cid_group = pattern.search(response.text)
        cid = cid_group.group().split('-')[0] if cid_group is not None else cid_group
        return cid
    
    def get_bullet_list(self, cid):
        bullet_url = f'https://comment.bilibili.com/{cid}.xml'
        response = requests.get(bullet_url)
        response.encoding = 'utf-8'
        assert response.status_code == 200, 'request failed'
        
        bullet_list = re.findall('<d p=".*?">(.*?)</d>', response.text)
        return bullet_list
        
        
if __name__ == '__main__':
    bv_name = 'BV1rN411H7UV'
    spider = BulletSpider(bv_name=bv_name)
    
    # get cid
    cid = None
    while cid is None:
        print('try to get cid ...')
        cid = spider.get_cid()
        if cid is None:
            time.sleep(random.randint(1, 3))
    print(f'cid: {cid}')
    
    # get bullet list
    bullet_list = spider.get_bullet_list(cid)
    print(f'bullet number: {len(bullet_list)}')
    
    # write to file
    with open(f'./front/public/bullets/{bv_name}_bullet.json', 'w') as file:
        json.dump({'bullet_list': bullet_list}, file, ensure_ascii=False)
    util.get_high_freq_word_list(bv_name)
    
    
    