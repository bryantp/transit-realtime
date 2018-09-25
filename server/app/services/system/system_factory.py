import sys

from .raspian import RaspianSystemService
from .windows_10 import WindowsSystemService


def get_service():
    if sys.platform.startswith('linux'):
        return RaspianSystemService()
    if sys.platform.startswith('win'):
        return WindowsSystemService()
