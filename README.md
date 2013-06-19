L8 smartlight server Simulator
===================

http://www.l8smartlight.com/sdk/

Simulator

Presently, the Simulator is simple, but it's enough to start playing around and testing. 
We will be extending its functionalities taking into account your comments and suggestions and integrating features we are currently working on.

The Simulator is a Web page with its own API. 

To use it, first you need to generate a Token. This Token can be used for every try out you want, or to generate new ones. To generate a Token, it's needed a post call to:

http://54.228.218.122/l8-server-simulator/l8s

To make post calls, we use the Google Chrome's plugin: Postman
https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en

Although maybe some of you already have your favourite tools ;)

An ID like this will be generated: {"id":"d37df1c47e0448cec8022402c59fa155"} to be appended in the URL, giving you the chance to load it in a web browser and to make use of the simulator for your own. 

In this way:
http://54.228.218.122/l8-server-simulator/l8s/d37df1c47e0448cec8022402c59fa155

Currently, and it's something we are improving, both SDKs generate new Tokens each time you invoke them. You can know the generated Token created in each execution by invoking, as you will see, in the samples: "l8.getId()"

Nevertheless, you can also change the code to use always the same Token, up to you!

There are several methods, but you have samples to see how the work the main ones in:

https://github.com/l8smartlight/l8-sdk-objc

    L8SDKTest, inside the Objective-C SDK.
    
https://github.com/l8smartlight/l8-sdk-java

    L8Manager, inside the bundle: “com.l8smartlight.sdk”.



