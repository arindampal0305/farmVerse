**Git Workflow (Team)**

**Branch structure:**

```text
main
└── mainbackup      ← Shared integration/testing branch
    ├── <your_name>_<feature_name>
    ├── <your_name>_<feature_name>
    .
    .
    └── <your_name>_<feature_name>
```

### 1. Start every day by updating `mainbackup`

```bash
git switch mainbackup
git pull origin mainbackup
```

### 2. Create your feature branch from `mainbackup`

```bash
git switch -c yourName_featureName
```

Example:

```bash
git switch -c ananya_login
```

### 3. Work on your feature

```bash
git add .
git commit -m "Your commit message"
git push -u origin yourName_featureName
```

### 4. When your feature is complete

Merge your feature branch into `mainbackup`, then push:

```bash
git switch mainbackup
git pull origin mainbackup
git merge yourName_featureName
git push origin mainbackup
```

**INSTRUCTIONS:**

*  Always start from `mainbackup`.
*  Create a new `yourName_featureName` branch for each task.
*  Merge completed features into `mainbackup`.
*  Do not commit directly to `main`.
*  Do not commit directly to `mainbackup` unless you're merging a completed feature.
*  `mainbackup` is our shared testing/integration branch. Once everything is tested, it will be merged into `main`.
