from dateutil import parser
# format iso datetime
def strptime(string):
    result =  parser.parse(string)
    return result