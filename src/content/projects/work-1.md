---
title: 'The Online Indie Artists Club'
description: 'Created a website for a volunteer-ran online artist collective.'
imageThumb:
    url: '/images/indie-artists-0.png'
    alt: 'Indie Artists Club Thumbnail'
image:
    url: '/images/indie-artists-1.png'
    alt: 'Indie Artists Club Homepage'
supImage1:
    url: '/images/indie-artists-2.png'
    alt: 'Indie Artists Club Resource List'
supImage2:
    url: '/images/indie-artists-3.png'
    alt: 'Indie Artists Club Zine Page'
platform: Web
stack: HTML, CSS, JavaScript, JSON
website: https://indieartists.club/
---

A website that spawned from a collective that wanted to create a simple resource hub, as artistic resources of this sort are often very scattered online. One of the main things is that they wished to keep the website as "vanilla" and lightweight as possible, for three main reasons:

1. To be accessible to as many people as possible, particularly considering this demographic is known to have many low income users and youth in it.
2. To be able to be easily passed on to someone else if needed, with the assumption this person would have mid-to-low tech knowledge, and would need something simple to learn.
3. To be able to openly show the source code and show others how simple it is to create a functional website, thus encouraging users of this demographic to have more independence in their online spaces.

The main design of the website is simple. It is inspired by early 2000s websites that are popular in this demographic currently, particularly taking design inspiration from the retired original DeviantArt layout. It was decided to use Neocities as a host, as it is a popular and easy-to-use static website host, that has a built-in community that overlaps heavily with our target demographic.

I ended up learning **Github Actions** and **Github Secrets** for this project, using the [Deploy to Neocities](https://github.com/marketplace/actions/deploy-to-neocities) action, which allows any pushes or merging into the _main_ branch to automatically deploy to the host, as this action is not built into the host.

The main decision was to take the resource lists from completely static HTML to JSON lists that are fetched. While still involving a lot of manual input, the Javascript functions were set up in such a way that any future person that looks after the website would only need to worry about learning the very basics of JSON in order to maintain and build off the list, making it the most reasonable solution for this project. 

The function reads the id of the body, and fetches the JSON file that matches the id. It then matches the array names with the DL id names in the HTML, and fills the list. Following this simple structure allows for infinite development by anyone.