import random


def generate_unique_reference():
    number = random.randrange(11111111, 99999999, 8)
    reference = f"ref{number}"
    return reference
