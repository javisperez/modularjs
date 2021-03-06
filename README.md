# ModularJS Generator for Yeoman

> An awesome [Yeoman](http://yeoman.io) generator


## About this generator

### What's included?

- AngularJS (1.4.x)
- Bower
- Gulp
- jQuery
- Bootstrap / Bootstrap SASS or Angular Material (you choose)
- Angular UI (with bootstrap only)
- Font Awesome (with bootstrap only)
- Material Icons (with material only)
- Toastr w/Angular wrapper
- SugarJS
- Angular Loading Bar

### How about coding style?

We have included some rules for:

- JSCS
- jsHint
- EditorConfig

### How to use this generator?

Short answer:

```bash
yo modularjs
```

It will then ask you the name of your appication

Then it'll ask if you would like to use Bootstrap or Material as CSS framework

Also, will ask if you want to be able to run E2E tests and/or Unit tests

Please note: If you say YES to the latest two questions (E2E or Unit Tests), then the Gulp rules for E2E and Unit Testing in Angular will be added


### Sub generators

Do you want to generate a new module? easy, use our sub generator:

```bash
yo modularjs:module
```

It will ask you for the name of the new module and a few more questions, just answer what you need

## About Yeoman

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-modularjs from npm, run:

```bash
npm install -g generator-modularjs
```

Finally, initiate the generator:

```bash
yo modularjs
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
