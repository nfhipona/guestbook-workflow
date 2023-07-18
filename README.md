# guestbook-workflow
Allows you to use your repo issues as your guestbook entries and show it on your github profile or project's *readme*.


## Usage
Create a folder named `.github/workflows` in your root directory.
Define your `yml` config file under .github/workflows folder in your repository.
Add workflow section tag in your `README` file.

```md
<!--START_SECTION:[section_identifier]-->
<!--END_SECTION:[section_identifier]-->

ex.
<!--START_SECTION:guestbook-section-->
<a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a> <a href="https://github.com/nfhipona"><img src="https://avatars.githubusercontent.com/u/8805997?u=8b6d5144a4b1cf8a953b79fd38abffb7485389ed&v=4" height="30"/></a>

* **[nfhipona](https://github.com/nfhipona) *wrote on 7/18/2023*:**  With body formatting: This guestbook workflow was inspired by readme-guestbook!
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:** Another comment from random pips
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:**  CUSTOM_TITLE: Testing the waters with updated template formatting.
* **[nfhipona](https://github.com/nfhipona) *wrote on 7/16/2023*:**  Comment_Title: Comment Body...

Do you like my project or just want to say hi? Feel free to [post something](https://github.com/nfhipona/guestbook-workflow/issues/new?title=GUEST_BOOK_ENTRY) to ***[my](https://github.com/nfhipona)*** guestbook!
<!--END_SECTION:guestbook-section-->

## About
This this project `guestbook workflow` was inspired by [readme-guestbook](https://github.com/muety/readme-guestbook)!
This work very similarly with some adjustments. I had some issues integrating `readme-guestbook` on my repo and I can't manage to fix so I decided to create my own with this as a basis. Don't forget to checkout [readme-guestbook](https://github.com/muety/readme-guestbook)!