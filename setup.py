from setuptools import setup, find_packages

setup(
    name='gov-military-proposal-generator',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        'Flask',
        'requests',
        'beautifulsoup4',
        'scrapy',
        'pandas',
        'numpy',
        'scikit-learn',
        'tensorflow',
    ],
    entry_points={
        'console_scripts': [
            'generate-proposal=backend.app:main',
        ],
    },
    author='Your Name',
    author_email='your.email@example.com',
    description='An automated generator for government and military proposals.',
    license='MIT',
    keywords='proposal generator government military',
    url='https://github.com/yourusername/gov-military-proposal-generator',
)