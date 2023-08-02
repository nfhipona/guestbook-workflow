# Guestbook Workflow

Allows you to use your repo issues as your guestbook entries and show it on your github profile or project's *README* file.


## Environment Flags

| Environment Flag      |  Default Value           | Required | Description                          |
|:----------------------|:------------------------:|:-------: |:-------------------------------------|
| `gh_token`            | `${{ github.token }}`    | No | GitHub access token with Repo scope. |
| `max_display_count`   | `10` | No | Maximum number of entries you want to show on your `README` file. |
| `max_character_count` | `300` | No | Maximum character length to display in the guestbook. |
| `retry_enabled` | `true` | No | Sets retry fetch flag enabled or disabled. |
| `max_retry_count` | `3` | No | Maximum number of times to retry the fetch operation if it fails. |
| `retry_wait_time` | `3` | No | Time to wait before each retry operation in seconds. |
| `entry_identifier` | `GUEST_BOOK_ENTRY` | No | Guestbook title prefix identifier. |
| `entry_identifier_delimiter` | `:` | No | Guestbook title prefix identifier delimiter to separate entry title. eg. `GUEST_BOOK_ENTRY: USER_CONTENT_TITLE`. |
| `comment_template` | `* **[$username]($profile) *wrote on $date*:** $title: $content` | No | Template format to display guests comments. variables: `$username`, `$profile`, `$date`, `$title`, `$content`. |
| `comment_empty_title_template` | `* **[$username]($profile) *wrote on $date*:** $content` | No | Template format to display guests comments. variables: `$username`, `$profile`, `$date`, `$content` |
| `comment_link_template` | `Do you like my project or just want to say hi? Feel free to [post something](https://github.com/$username/$repo/issues/new?title=$identifier) to ***[my](https://github.com/$username)*** guestbook!` | No | Template format to display link to guestbook. |
| `empty_template` | `Nothing to see here. Be the first to [post something](https://github.com/$username/$repo/issues/new?title=$identifier) to ***[my](https://github.com/$username)*** guestbook!` | No | Template format to display when guestbook is empty. variables: `$username`, `$repo`, `$identifier`. |
| `target_branch` | `main` | No | The target branch to work on. Defaults to `main`. |
| `section_identifier` | `guestbook` | No | The section identifier in readme file. |
| `include_body_formatting` | `true` | No | Flag to tell the parser to include original formatting on the comment body. |
| `close_outdated_issues` | `false` | No | Close all outdated issues or comments past the `max_display_count` parameter. |


## Usage

Create a folder named `.github/workflows` in your root directory.
Define your `.yml` config file under .github/workflows folder in your repository.

Add workflow section tag in your `README` file.

```md

<!--START_SECTION:[section_identifier]-->
<!--END_SECTION:[section_identifier]-->

```

Sample `.yml` config.

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

      - name: Update guestbook with the latest guest post entries
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
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/18/2023*:**  Added additional flags and formatting: Added auto close all outdated issues or comments past max display count! [check me here]([github.com/marketplace/actions/guestbook-workflow](https://github.com/marketplace/actions/guestbook-workflow))!
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/18/2023*:**  With body formatting: This guestbook workflow was inspired by [readme-guestbook](https://github.com/muety/readme-guestbook)!
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:** Another comment from random pips
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:**  CUSTOM_TITLE: Testing the waters with updated template formatting.

Do you like my project or just want to say hi? Feel free to [post something](https://github.com/nfhipona/guestbook-workflow/issues/new?title=GUEST_BOOK_ENTRY) to ***[my](https://github.com/nfhipona)*** guestbook!
<!--END_SECTION:guestbook-section-->


## About

This this project `guestbook workflow` was inspired by [readme-guestbook](https://github.com/muety/readme-guestbook)!
This work very similarly with some adjustments. I had some issues integrating `readme-guestbook` on my repo and I can't manage to fix so I decided to create my own with this as a basis. Don't forget to checkout [readme-guestbook](https://github.com/muety/readme-guestbook)!