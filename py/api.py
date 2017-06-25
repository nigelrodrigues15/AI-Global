import twitter
try:
	import simplejson as json
except ImportError:
	import json

api = twitter.Api(consumer_key='DXKLr99ACQ66nOru2eAiuAlDC',
                  consumer_secret='gBwVqldX1CDtg2UkE0pF4Z4GhCfVFLDGQtdxY2lfB7j5NWPc5Q',
                  access_token_key='878745777081696256-S0WCa1qKyUMEkzFPtnvOKDcPvtzroFb',
                  access_token_secret='b40z4o3fpMe780fMfFOyEzODy26J6Sw9Z4QhsUkuzuTDB')

# print(api.VerifyCredentials())

statuses = api.GetUserTimeline(screen_name= "realDonaldTrump")
print([s.text for s in statuses])

# users = api.GetFriends()
# print([u.name for u in users])

with open('status.txt', 'w', encoding='utf-8') as outfile:
    json.dump(statuses, outfile, ensure_ascii=False)

with open('output.txt', 'a') as f:
    # api.GetStreamFilter will return a generator that yields one status
    # message (i.e., Tweet) at a time as a JSON dictionary.
    for line in api.GetStreamFilter(track='@twitter', languages='en'):
        f.write(json.dumps(line))
        f.write('\n')



