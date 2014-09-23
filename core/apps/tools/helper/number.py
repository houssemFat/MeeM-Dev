class _number_str(float):
    # kludge to have decimals correctly output as JSON numbers;
    # converting them to strings would cause extra quotes
    def __init__(self, o):
        self.o = o
        
    def __repr__(self):
        return str(self.o)