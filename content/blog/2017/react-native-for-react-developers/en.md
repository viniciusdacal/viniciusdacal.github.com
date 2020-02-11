---
title: React Native for React Developers
description: >-
  React Native is becoming the definitive solution to create apps across
  multiple platforms. What React Native offers, is the possibility to…
date: '2017-02-16T13:07:18.793Z'
categories: []
keywords: []
image: "../../__legacy-img/1__1gHn6GIryclL37dAAlIiJQ.png"
language: "en"
---

**React Native** is becoming the definitive solution to create apps across multiple platforms. What React Native offers, is the possibility to create native mobile apps using only Javascript .

In this post, I am going to make a comparison between React and React Native, and what are the first things a React Developer should know before starting to code.

### Building Blocks

React Native uses the same design as React, you will be using JSX and JavaScript to create your components. However, you have to pay attention to some particularities.

You are not writing for the web, so you cannot use the regular HTML elements, such as **div**, **input**, **span**, **button**, etc… Instead of those regular elements, you have a bunch of native components that React Native provides. It is possible to find all of them [here](https://facebook.github.io/react-native/docs/activityindicator.html).

For example, you can use a **View** component instead of a **div**, and use a **Text** where you would use a **span.**

To inform React Native about which component is the root in your Application, you have to use **AppRegistry.**

Usually, this code goes inside the index.ios.js or index.android.js file. The result will be as shown below:

![](../__legacy-img/1__lpr7JI__vbC7c74mFroPkFw.png)

### Styling Components

React Native supports most of CSS properties. If you are familiar with regular CSS, you’ll have no big trouble styling your components.

Let’s focus on the main differences. On React Native, you are not able to use stylesheets, you have to use inline styles. I know it can seem weird, but it’s just how it works, and it works very well.

**Width and Height:** All dimensions are unitless and represent density independent pixels. In other words, you are not able to use percentage to set width, height, padding or margin.

See the code bellow and its result:

![](../__legacy-img/1__Y62wFQmj9nNckXN__hAeHyw.png)

React Native does not support percentage, but it fully supports Flexbox Layout. So, you are able to create consistent layouts for different screen sizes.

> Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions. The defaults are different, with `flexDirection` defaulting to `column` instead of `row`, and the `flex` parameter only supporting a single number. [Docs](https://facebook.github.io/react-native/docs/flexbox.html#content).

Observe the code bellow using Flexbox:

![](../__legacy-img/1__3246__lb____lwol9KyvKssAw.png)

Beyond particularities about dimension and default values, some components support only specific style attributes. For example, you cannot use font attributes(fontSize, FontFamily, color) in a **View** expecting the texts inside it to inherit the style. It’s possible to check all allowed attributes inside each component’s documentation. Check out the allowed attributes for the **View** component [here](https://facebook.github.io/react-native/docs/view.html#style).

For more detailed information about styling, try the [Style section](https://facebook.github.io/react-native/docs/style.html) on React Native documentation.

### Events and User Interaction

On React, we often catch interaction events by passing event handlers for specific props such as **onClick**, **onFocus** and **onBlur.** In React Native, you can do the same, in a similar way.

To create a button for example, you have to use a native tappable component, such as [**TouchableHighlight**](https://facebook.github.io/react-native/docs/touchablehighlight.html)**,** [**TouchableNativeFeedback**](https://facebook.github.io/react-native/docs/touchablenativefeedback.html)**,** [**TouchableOpacity**](https://facebook.github.io/react-native/docs/touchableopacity.html)  or  [**TouchableWithoutFeedback**](https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html)**.** Those components are able to catch touch events. To do that, you just pass an event handler to **onPress**.

It’s also possible to catch a _long press event_, just passing an event handler to **onLongPress**, the same way we did with **onPress.**

Another common event that is different is **onChange**, mostly used with input components. Now you just use **onChangeText** instead**.**

### Conclusion

React Native is an Awesome project. Facebook is investing a lot on it and a lot of companies already adopt this technology, so you certainly can say it’s safe for production. With React Native, it’s easy to build and ship native mobile apps.

For sure, there is a lot more about React Native than we could touch on this post, if you are willing to dive into this, I would adivise you to start from the [Documentation](http://facebook.github.io/react-native/docs/getting-started.html), the community has doing a awesome job there.

Did you enjoy the post and think it’s useful? Give a recommend❤️ below, to help us spread the word :)
