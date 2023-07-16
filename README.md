# guestbook-workflow
Allows you to use your repo issues as your guestbook entries and show it on your github profile or project's *readme*.


## Usage
Define your yml config file under .github/workflows folder in your repository.

*Valid inputs are:*
`max_display_count`, `max_character_count`, `committer_username`, `committer_email`, `commit_message`, `enable_keepalive`, `max_retry_count`, `retry_wait_time`, `entry_identifier`, `entry_identifier_delimiter`, `comment_template`, `comment_empty_title_template`, `comment_link_template`, `empty_template`, `target_branch`, `section_identifier`

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
```


## Guestbook
<!--START_SECTION:guestbook-section-->
<a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a>

* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:** Another comment from random pips
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:**  CUSTOM_TITLE: Testing the waters with updated template formatting.
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:**  Comment_Title: Comment Body...
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:** Testing the waters

Do you like my project or just want to say hi? Feel free to [post something](https://github.com/nfhipona/guestbook-workflow/issues/new?title=GUEST_BOOK_ENTRY) to ***[my](https://github.com/nfhipona)*** guestbook!
<!--END_SECTION:guestbook-section-->

## About
This this project `guestbook workflow` was inspired by [readme-guestbook](https://github.com/muety/readme-guestbook)!
This work very similarly with some adjustments. I had some issues integrating `readme-guestbook` on my repo and I can't manage to fix so I decided to create my own with this as a basis. Don't forget to checkout [readme-guestbook](https://github.com/muety/readme-guestbook)!