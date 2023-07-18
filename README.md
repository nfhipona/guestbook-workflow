# guestbook-workflow
Allows you to use your repo issues as your guestbook entries and show it on your github profile or project's *readme*.


## Usage
Create a folder named `.github/workflows` in your root directory.
Define your `yml` config file under .github/workflows folder in your repository.
Add workflow section tag in your `README` file.

```md
<!--START_SECTION:[section_identifier]-->
<!--END_SECTION:[section_identifier]-->
```

*Valid inputs are:*
`max_display_count`, `max_character_count`, `committer_username`, `committer_email`, `commit_message`, `enable_keepalive`, `max_retry_count`, `retry_wait_time`, `entry_identifier`, `entry_identifier_delimiter`, `comment_template`, `comment_empty_title_template`, `comment_link_template`, `empty_template`, `target_branch`, `section_identifier`, `include_body_formatting`, `close_outdated_issues`

```yml
name: Guestbook Workflow
on:
  schedule: # Run workflow automatically
    - cron: '0 0 31 12 *' # Runs at 00:00 on day-of-month 31 in December.
  workflow_dispatch: # Run workflow manually (without waiting for the cron to be called), through the GitHub Actions Workflow page directly
  issues:
    types: [opened, closed, reopened, deleted, edited]
permissions:
  contents: write # To write the generated contents to the readme

jobs:
  update_guestbook:
    name: Update this repo's README with guestbook's latest activity
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Update guestbook
        uses: nfhipona/guestbook-workflow@main
        with:
          target_branch: 'main'
          section_identifier: 'guestbook-section'
          include_body_formatting: true # this already defaults to true -- just for demo
          close_outdated_issues: true
```


## Guestbook
<!--START_SECTION:guestbook-section-->
<a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a>

* **[nfhipona](https://github.com/nfhipona) *wrote on 7/18/2023*:**  Formatted Body: Check it out. This project is under [MIT License](https://github.com/nfhipona/guestbook-workflow/blob/main/LICENSE)
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/18/2023*:**  Added additional flags and formatting: Added auto close all outdated issues or comments past max display count! [check me here]([github.com/marketplace/actions/guestbook-workflow](https://g
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/18/2023*:**  With body formatting: This guestbook workflow was inspired by [readme-guestbook](https://github.com/muety/readme-guestbook)!
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:** Another comment from random pips
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:**  CUSTOM_TITLE: Testing the waters with updated template formatting.

Do you like my project or just want to say hi? Feel free to [post something](https://github.com/nfhipona/guestbook-workflow/issues/new?title=GUEST_BOOK_ENTRY) to ***[my](https://github.com/nfhipona)*** guestbook!
<!--END_SECTION:guestbook-section-->


## About
This this project `guestbook workflow` was inspired by [readme-guestbook](https://github.com/muety/readme-guestbook)!
This work very similarly with some adjustments. I had some issues integrating `readme-guestbook` on my repo and I can't manage to fix so I decided to create my own with this as a basis. Don't forget to checkout [readme-guestbook](https://github.com/muety/readme-guestbook)!