---
layout: post_en
title:  "Learning the Basics About Redux"
date:   2016-06-22 20:00:00
categories: profession
uglyTitle: "learning-the-basics-about-redux"
bg: "basic-redux.jpg"
---
Redux is a predictable state container for JavaScript Applications, but what
does that mean?

![](https://d262ilb51hltx0.cloudfront.net/max/600/1*deNSjC7XD-DA3w4wNK7XEQ.jpeg)

Created by [Dan Abramov](https://medium.com/u/a3a8af6addc1), Redux is an
application architecture pattern based on
[Flux](http://facebook.github.io/flux/) ideas and simplified with concepts from
[Elm](https://github.com/evancz/elm-architecture-tutorial/). Redux gives you the
power to build consistent applications and to control the way your data flows
and is transformed, following three principles:

### 1. Single Source of Truth
[(SSOT)](https://en.wikipedia.org/wiki/Single_source_of_truth)

The entire state of your application is stored in an object tree within a
single** **[store](http://redux.js.org/docs/Glossary.html#store). Any access to
the state is done by referencing the original data, in the store. This way, when
information is updated it gets propagated throughout the application, thus
preventing duplicate data.

### 2. State is Read-only

The only way to change the state of your application is by emitting an
**action**, an object that describes what happened.

To access the state you can use the method **getState** from the store. It
returns the whole application state, but as read-only.

To listen to changes on the state we use the store’s method **subscribe**, and
pass a listener as a parameter in the following way:
{% highlight js %}
const unsubscribe = store.subscribe(() => {
  //execute every time the state change
  const state = store.getState();
});
unsubscribe(); //canceling listener
{% endhighlight %}

> As we can see in the above example, when we want to cancel the listener we just
> call the value returned from the method subscribe, as a function.

When we need to modify the **state**, the change needs to be requested by an
**action**, an object containing a **type **(required) and a **payload
**(optional). The **type** is an identifier for the action and the **payload**
is the content to be sent with the **action**, as seen in the following example:
{% highlight js %}
const action = {
  type: 'ADD_CONTACT',
  name: 'Jon Snow',
  email: 'youknownothing@jonsnow.com'
};
{% endhighlight %}

In the example above, the **action** has type ADD_CONTACT and the necessary data
to include this contact in the **state.**

It’s common to create actions using **action creators**, which are functions
that expect specific parameters and return a formatted object, as in the
following example:

{% highlight js %}
const addContact = (name, email) => {
  return {
    type: 'ADD_CONTACT',
    name,
    email
  }
};
{% endhighlight %}

To dispatch an **action**, we use the method **dispatch** from the store:

{% highlight js %}
dispatch(addContact('Jon Snow', 'youknownothing@jonsnow.com'));
{% endhighlight %}

### 3. Changes are made with Pure functions

To describe the way the state will be changed by the actions, we write pure
[reducers](http://redux.js.org/docs/Glossary.html#reducer)**.**

**Reducers** are functions that are called every time an action is dispatched.
They receive the current state and the **action** as parameters, and return the
new **state.**

It’s important to highlight that a **reducer** must be a [pure
function](https://en.wikipedia.org/wiki/Pure_function). Given the same
parameters, a reducer should always return the same result, and to do that, it
has to be based on its own scope.

To learn and understand more about pure functions, I suggest you read the post
[What is a pure
function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.q8sxpapvy)
from [Eric Elliott](https://medium.com/u/c359511de780).

Considering our reducers must be pure functions, we are going to implement our
logic to include a new contact in the **state**.
{% highlight js %}
const reducer = (state = {}, action) => {
  if (action.type === 'ADD_CONTACT') {

    return {
      ..state,
      contactCollection: [
        ...state.contactCollection,
        {
          name: action.name,
          email: action.email
        }
      ]
    };
  }
}
{% endhighlight %}

As we can see in the above example, our reducer checks if the action is of type
ADD_CONTACT. If it is, it returns a new state, including the new contact.

To get the most out of **Redux, **you must understand the concept of
immutability. In the above example, we don’t use the **push **method** **to
include the new contact in the **contactCollection**, instead, we return a new
contactCollection. This one has the same contacts as the previous collection,
but contains the new contact. This way we preserve the previous state and stay
in the premise of **read-only state.**

By following these three principles, you can write a predictable application
very easily.

In this post, we only scratched the surface of Redux. In the next posts, I
intend to go deeper in each concept.

The [ReduxJS](http://redux.js.org/) is a Javascript lib that implements Redux in
only 2kb. It has great documentation, where you can find information about each
Redux feature. If you intend to go deeper, the documentation is a good place to
start.

At the beginning, Redux can seem a little complicated because it is different
from what we are used to. Nevertheless, as soon as you learn the basics, the sky
is the limit.

*****

Did you enjoy the post and think it’s useful? Share this article, to help
us spread the word :)
