# Contributing

**Black Team Members**
```
AlexTricty
baconpancakes1482
cyfiSmeltzer
glocknesmonster
---
---
```

**How to Collaborate**:
Make sure to setup GitHub terminal and use the link provided in docs/resources.md to find the install link.

After installign the Github terminal, open it up and see this link: 
https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup

**Account Setup**:
```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

**Getting a copy of the main repository**:
```
$ git clone https://github.com/baconpancakes1482/narc-drone.git
```

**Accessing the repo through the terminal**:
```
$ cd ~
$ ls             #Look for the directory named narc-drone
$ cd narc-drone
$ git checkout -b any-name-you-want  #This creates a new branch so you can submit changes safely to the main branch later (Highly advised you do so)
```
Make sure your work is all in a different branch and not on main!
**Submitting your changes to the main repo**:
```
$ git add the-file-or-files-you-changed
$ git commit -m "Make a nice message explaining what was changed"
$ git push origin the-name-of-the-branch-you-used
```
This will create a pull request that the contributors can view and approve for merging to the main branch.
