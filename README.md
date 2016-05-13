Grasper
=======

Grab all users &amp; organizations from GitHub using Tentacles.


Examples
--------

These will start at the beginning:

```
GITHUB_ACCESS_TOKEN=xxxxx ./examples/grasp-orgs.js > orgs.csv
GITHUB_ACCESS_TOKEN=xxxxx ./examples/grasp-users.js > users.csv
```

These will continue after lastId:

```
GITHUB_ACCESS_TOKEN=xxxxx ./examples/grasp-orgs.js lastId >> orgs.csv
GITHUB_ACCESS_TOKEN=xxxxx ./examples/grasp-users.js lastId >> users.csv
```

They both just output `login,id` lines, so the last line contains the id up to
where it got last time.
