import jieba
import re
import collections
import json
import csv


def get_high_freq_word_list(bv_name, topk=150):
    with open(f'./front/public/data/bullets/{bv_name}_bullet.json', 'r') as file:
        data = file.read()
        
    data = re.findall('[\u4e00-\u9fa5]+', data, re.S)
    data = ' '.join(data)
    
    seg_list = jieba.cut(data, cut_all=True)
    
    with open('stop_word.txt', encoding='utf-8') as f:
        line = f.readlines()
        stop_word = set()
        for word in line:
            word = word.replace('\n', '')
            stop_word.add(word)
    
    word_list = []
    for word in seg_list:
        if word not in stop_word and len(word) > 1:
            word_list.append(word)
        
    word_count = collections.Counter(word_list)
    word_count_topk = word_count.most_common(topk)
    
    for idx in range(len(word_count_topk)):
        word_count_topk[idx] = [word_count_topk[idx][0], word_count_topk[idx][1]]
    
    with open(f'./front/public/data/bullets/{bv_name}_word.json', 'w') as file:
        json.dump({'word_list': word_count_topk}, file, ensure_ascii=False)
        
    return word_count_topk


if __name__ == '__main__':
    print(get_high_freq_word_list('BV1RS4y1A7nV'))
    # with open('./tag_dict.csv', 'r', encoding='gbk') as f:
    #     reader = csv.reader(f)
    #     tag_name = None
    #     tag_count = None
    #     for row_idx, row in enumerate(reader):
    #         if row_idx == 0:
    #             tag_name = row
    #         else:
    #             tag_count = row
        
    #     data = []
    #     for i in range(len(tag_name)):
    #         data.append([tag_name[i], tag_count[i]])
            
    #     data = sorted(data, key=lambda x: -int(x[1]))
        
    #     with open(f'./front/public/data/hot_tag/data.json', 'w') as file:
    #         json.dump({'word_list': data[:150]}, file, ensure_ascii=False)
        