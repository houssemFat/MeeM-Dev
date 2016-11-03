from dtools import MapReduce
import sys

"""
Join relationship in Simple Python MapReduce Framework
"""

mr = MapReduce.MapReduce()

# =============================
# Do not modify above this line

def mapper(record):
    # key: document id
    # value: text of the document
    order_id = record[1]
    # table line item record
    mr.emit_intermediate(order_id, record)

def reducer(key, list_of_values):
    # key : word
    # value: list of occurrence documents
    items = []
    order = None
    for v in list_of_values:
        # line item 
        if v[1] == key :
            if v[0] == "line_item":
                items.append(v)
            else :
                order = v
    for i in items :
        mr.emit(order + i)

# Do not modify below this line
# =============================
if __name__ == '__main__':
    inputdata = open(sys.argv[1])
    mr.execute(inputdata, mapper, reducer)
