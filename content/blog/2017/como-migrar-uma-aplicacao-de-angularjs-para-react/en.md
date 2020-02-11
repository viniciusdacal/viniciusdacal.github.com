---
title: How to migrate an application from AngularJS to React and Redux
description: >-
  Starting this year, I was hired by BEN Group, with the main goal of helping
  them migrate a legacy application from AngularJS to React and…
date: '2017-10-20T16:53:40.079Z'
categories: []
keywords: []
image: "../../__legacy-img/1____lLRGp1g5biW5__yCcpTYZA.png"
language: "en"
---

Starting this year, I was hired by [BEN Group](https://ben.productplacement.com/), with the main goal of helping them migrate a legacy application from _AngularJS_ to _React_ and _Redux_. Since then, we have been creating solutions inside the project, that is working greatly so far.

In this post, I intend to show the main approaches we followed and share some solutions we created, to allow us migrate the project gradually and without loose our sanity.

> **Disclaimer**: Our focus here, is not refactoring legacy code, but remove it as soon as possible. We avoid solutions that takes too much time or focus in changing the legacy code in order to let it “prettier”. That said, we prime to write new code with great quality.

### Move the build to webpack.

This step, I consider the most import from the whole process, once with _Webpack_, you can start using the instruction **import** to get your dependencies and modules and you can start getting rid of Angular’s Dependency Injection(DI). This is also necessary to start writing _React_ code in the application.

> If you use Angular’s template cache, Pug(Jade) or any other thing that influences the build, don’t worry, Webpack will have a loader for each one of them. Don’t forget to let your Webpack configured to transpile ES2015 and JSX.

This step doesn’t focus on moving all the DI to imports, but instead, make your build work with _Webpack_. It’s important to keep that in mind, to avoid staying in this task for weeks and cause conflicts in dozens of files.

In _AngularJS_, normally, the build process gets all the dependencies you need from `node_modules` and insert them in the bundle. We need to keep that behavior in the new build as well.

> You need to consider the legacy code as an enemy to be defeated. We need to act with caution and we need to be strategic. This also means, that in certain moments, we need to do things that aren’t pleasant.

To solve that matter, we created a file `vendor.js`, and imported all the dependencies inside it:

Most of the dependencies registered themselves globally in the _window_ object, when they are imported. So, we only need to import them as the above example. Although, some of them doesn’t do that and we need to do it manually. Bellow we have an example of what we had to do with **_moment_** and **_jQuery_**:

This practice could be weird, however, you need to consider that most of the dependencies are relying on `window.$`, others on`window.jQuery` and others even on `window.jquery.`

After creating the vendors file, import it in the entry point of your application and this way, all your dependencies will be in the bundle:

require('./vendors');

Another step, is to ensure that all your application’s files are in the bundle. The ideal, is having each module with an index file, importing controllers, factories, views, etc.. Having that, you only need to import those indexes in the application’s entry point, same way you did with vendors, as the following example:

If you don’t have the indexes, you can try to follow a solution a little dare, not much advised though. That would be find a regex to match all your files and import them using **require.context**, as the below example:

The above code, will force _Webpack_ to include in the bundle, all `.js` and `.jsx` files that are inside `/app` folder and its subfolders. If you decide to follow this way, don’t forget that you may have `.test.js` ,`.spec.js` and even `.stories.js` files, and you will have to exclude them in the regex.

Also, remember that in some cases, _Angular_ is counting on the ordering that your files are loaded, so, this solution could end up not working at all.

When you finally get your build working, hurry up to create a pull request targeting your master branch. Apart _React_, moving the build to _Webpack_ is already a gain for your application. The Angular’s DI makes the application to be strongly coupled and _Webpack_ is our ally against that

### Render React components inside AngularJS

The second most important step, because without that is not possible to migrate gradually. The idea here, is that you could use _React_ components inside _Angular_, as they were directives. To achieve that, we are currently using [_ngReact_](https://github.com/ngReact/ngReact)  in our project.

> The ngReact repo is advising to use the lib [_react2Angular_](https://github.com/coatue-oss/react2angular). However, we are using Angular 1.5.8 in our app, and we end up getting some problems trying to use the other lib. I already used react2Angular in another project, that were using a more recent Angular’s version and I didn’t have any issue. That said, ngReact even not being updated anymore, has all the feature we need to transform our components into directives. My advise is: choose the lib that works for you and go ahead, both are very similar

To integrate _ngReact_ in the project, you can install it from npm:

$ npm i --save ngreact

And then import it in your vendors:

require('**ngreact**');

You also need to install _react_ and _react-dom_ in your project:

npm i --save **react** **react-dom**

And then, register **react** module into _Angular_:

angular.module('app', \['**react**'\]);

With that done, we can create a **Button** component, as we would create in a regular _React_ application:

And then, we define a directive that works as a wrapper for **Button**:

In the directive’s file, we must define the name of all the props whose are used by **Button**, in order to _ngReact_ understands what it should pass down to the component.

Directive defined, we need to register it in _Angular_:

> The Angular’s modules that you gonna use to register it doesn’t matter, just make sure it was registered in the application.

Once registered, we can now use the directive in any angular’s view, as the follow example:

<div>
  <**react-button** class-name="btn"></**react-button**\>
</div>

Notice that here, instead of CamelCase, we use dash to split the words. In this case, reactButton becomes react-button and `className`, becomes `class-name`. It’s important to keep that in mind, given this is a common mistake and could take hours to debug.

It’s common to use _ngReact_ to render small components inside _AngularJS_ applications, but not much productive though.

_Angular_ _UI Router,_ allows us to pass a parameter template in the route config. Exploring that, it’s possible to create a wrapper component for each application’s screen and then use those wrappers as the following example:

In the above example, we define a login route and pass it to a component, which is the whole Login screen. This way, we can migrate a whole screen per time, instead of migrating component by component.

My gold advise here, is to install [_Storybook_](https://storybook.js.org/)  in the project, to create and test the small components. That way is easier to build solid components and then put them together into the screens.

> Screens: Also known as pages, they are the root component of each route.

### Share dependencies

Define an entire screen is amazing. However, when we come to this point, we also need to share some _Angular_ dependencies with _React_.

In the case of BEN, the dependencies we need, was only ready after the Angular’s initialization, after it have executed its providers, config, etc... Given that, it wasn’t possible to export them using the **export** keyword. To go around that, we created an object and a helper function to inject the dependencies. To implement that solution, we only need to create a file named `ngDeps.js` with the following code:

We call **injectNgDeps** inside an Angular’s [**run**](https://docs.angularjs.org/api/ng/type/angular.Module#run) process as the below example:

We do that because we want to have access to the dependencies as soon as possible and **run** is one of the first processes executed in the initialization. The **injectNgDeps** accepts an object as argument, and merge it with the **ngDeps** object.

When you need any dependency inside a _React_ component, you only need to do as the following:

Notice that the first thing we do, is to import **ngDeps**. If you try to access `ngDeps.$state` right after the **import**, the result will be `undefined`, because the **run** process didn’t ran yet. For that reason, we access the value inside the component’s **contructor** method, because the components will be instantiated only after _Angular_ has initialized.

We extract the dependencies from **ngDeps** and we assigned them to the object **this**, because this way we can access `this.$state` inside any class’s method

This way it’s possible to share any Angular’s dependency with _React_ components. However, use **ngDeps** with parsimony. Keep always in mind: Can I export this dependency using **export**? If the answer is yes, you always chose to use export, otherwise you use **ngDeps**.

Another thing to highlight, is that it is important to keep the access to **ngDeps** restrict to the top components in the tree. That means screens, and possibly some containers. And then, pass down to children by props. This way it will be easier to remove **ngDeps** when the time comes.

### Integrate Redux in the application

After solve the question about sharing dependencies between both sides, we can go ahead and integrate _Redux_ into the application. To do that isn’t so hard, but there are some particularities though.

First, configure the store following the [docs instructions](http://redux.js.org/), as you would do in any application. However, once you create the object **store**, you must export it asthe following way:

```
export const store = createStore(rootReducer);
```

That will allow us to access the **store** object in other files in the application

In a regular application, we integrate our containers to the **store**, using the method **connect** from [react-redux](https://github.com/reactjs/react-redux). Although, that only works because we insert the **Provider** with the **store** as the root component in the application, as we can see in the lib’s docs:

ReactDOM.render(
  <**Provider** store={**store**}>
    <MyAppRootComponent />
  </**Provider**\>,
  rootEl
)

The problem is that we can’t have a single root component in our application, we have many. It’s impractical that we keep controlling that manually, which components should contain the Provider and which doesn’t. To solve that, we created a High Order Component, which abstracts that logic and insert the Provider as a wrapper when necessary. To make it accessible, I published it on [Github](https://github.com/viniciusdacal/redux-connect-standalone) and on [NPM](https://www.npmjs.com/package/redux-connect-standalone) as [redux-connect-standalone](https://github.com/viniciusdacal/redux-connect-standalone).

To install it by NPM:

npm i --save redux-connect-standalone

And then, we can create our connect file and use the following code:

Inside your components, instead of importing the **connect** method from _react-redux_, import it from the file you just created. And use it the same way you would use the original method:

As we are respecting the same signature from the original method, the day you have a **Provider** as your application’s root component, you will only need to execute a search replace in the import method, to replace it by:

```
import { connect } from 'react-redux';
```

> If you use or intend to use redux-form in your application, I also created and published a HOC to reduxForm method, the [redux-form-connect-standalone](https://goo.gl/4XgxwZ). His usage is very similar to the HOC we saw above.

### Final words

Having those recipes in hands, it’s possible to migrate your application gradually. However, there are always other complex stuff that shows up when you are migrating an application’s base technology. It’s important to keep in mind that all the solutions above are a middle ground between Angular and React. The final goal is to get rid of all of them and use the _React_ and _Redux’s_ conventions and good practices. **So, whenever you create a solution, think how hard will be to get it removed later**.

If you find any interesting solution or problem, share with us.

If you like this post, help us spread the word for more people to keep evolving and improving their applications.
