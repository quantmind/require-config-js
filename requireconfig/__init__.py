from os import path

import lux
from lux.extensions.static import HtmlContent


HTML_TITLE = 'd3ext examples'
#STATIC_LOCATION = path.join(path.dirname(path.dirname(
#    path.abspath('__file__'))), 'docs', 'd3ext')
STATIC_LOCATION = ''
CONTEXT_LOCATION = None
MEDIA_URL = ''
STATIC_API = None
MINIFIED_MEDIA = True
CODE_HIGHLIGHT_THEME = 'github'
ASSET_PROTOCOL = 'http:'
REQUIREJS_CONFIG = 'require.config'
EXTENSIONS = ['lux.extensions.base',
              'lux.extensions.ui',
              'lux.extensions.code',
              'lux.extensions.angular',
              'lux.extensions.static']
HTML_TITLE = 'require.config.js'
HTML_META = [{'http-equiv': 'X-UA-Compatible',
              'content': 'IE=edge'},
             {'name': 'viewport',
              'content': 'width=device-width, initial-scale=1'},
             {'name': 'description',
              'content': 'Configuration script for requirejs'}]
HTML_LINKS = ['require.config.css']
DESCRIPTION = HTML_TITLE
MINIFIED_MEDIA = True
FAVICON = 'http://quantmind.com/media/quantmind/favicon.ico'


class Extension(lux.Extension):

    def middleware(self, app):
        examples = HtmlContent('/', drafts=False, dir='requireconfig/html')
        return [examples]
