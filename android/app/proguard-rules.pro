# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
# -dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip
-keep,allowobfuscation @interface com.facebook.jni.annotations.DoNotStrip

-keep class com.facebook.react.turbomodule.** { *; }

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keep @com.facebook.jni.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
    @com.facebook.jni.annotations.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * implements com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * implements com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**
-keep,includedescriptorclasses class com.facebook.react.bridge.** { *; }
-keep,includedescriptorclasses class com.facebook.react.turbomodule.core.** { *; }

# hermes
-keep class com.facebook.jni.** { *; }


# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**

##---------------Begin: proguard configuration for Tapsell Sdk  ----------

# Application classes that will be serialized/deserialized over Gson
-keepclassmembers enum * { *; }
-keep interface ir.tapsell.sdk.NoProguard

-keep interface ir.tapsell.sdk.NoNameProguard
-keep class * implements ir.tapsell.sdk.NoProguard { *; }

-keep enum * implements ir.tapsell.sdk.NoProguard { *; }

-keepnames class * implements ir.tapsell.sdk.NoNameProguard { *; }
-keep class ir.tapsell.sdk.nativeads.TapsellNativeVideoAdLoader$Builder {*;}
-keep class ir.tapsell.sdk.nativeads.TapsellNativeBannerAdLoader$Builder {*;}
-keep interface com.android.vending.billing.IInAppBillingService
-keep class * implements com.android.vending.billing.IInAppBillingService {*;}

-keep class ir.tapsell.sdk.models.** { *; }

-keep class ir.tapsell.sdk.sentry.model.** {*;}

# To Remove Logger Class (Todo: Replace Logger Class with LogUtils)
-assumenosideeffects class ir.tapsell.sdk.logger.Logger {
    public * ;
    public static *** LogDebug(...);
    public static *** LogError(...);
    public static *** LogInfo(...);
    public static *** LogVerbose(...);
    public static *** LogWarn(...);
}
# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /Users/ide/Library/Android/sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}


# THIS IS VERY VERY BAD. REMOVE AS SOON AS VERSIONING IS FIXED
-dontwarn **


-dontnote **

-keep class host.exp.exponent.generated.AppConstants { *; }

##### Crashlytics #####
-keepattributes SourceFile,LineNumberTable

##### Expo Universal Modules #####

-keepclassmembers class * {
  @**.expo.core.interfaces.ExpoProp *;
}
-keepclassmembers class * {
  @**.expo.core.interfaces.ExpoMethod *;
}

-keep @**.expo.core.interfaces.DoNotStrip class *
-keepclassmembers class * {
  @**.expo.core.interfaces.DoNotStrip *;
}

##### React Native #####
-keep,allowobfuscation @interface **.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface **.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface **.facebook.react.bridge.ReadableType

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @**.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
  @**.facebook.proguard.annotations.DoNotStrip *;
}

-keepclassmembers @**.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends **.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends **.facebook.react.bridge.NativeModule { *; }
-keepclassmembers class *  { @**.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @**.facebook.react.uimanager.ReactProp <methods>; }
-keepclassmembers class *  { @**.facebook.react.uimanager.ReactPropGroup <methods>; }

# TODO: shouldn't need these two rules
-keep interface **.facebook.react.bridge.** { *; }
-keep enum **.facebook.react.bridge.** { *; }

##### Versioned React Native #####
-keep class **.facebook.** { *; }
-keep class abi** { *; }
-keep class versioned** { *; }
-keep class expo.modules** { *; }

##### Butterknife #####
-keep class butterknife.** { *; }
-dontwarn butterknife.internal.**
-keep class **$$ViewBinder { *; }

-keepclasseswithmembernames class * {
    @butterknife.* <fields>;
}

-keepclasseswithmembernames class * {
    @butterknife.* <methods>;
}

##### Stetho #####
-keep class **.facebook.stetho.** { *; }
-dontwarn **.facebook.stetho.**

##### fresco #####
# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface **.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @**.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @**.facebook.common.internal.DoNotStrip *;
}

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

-dontwarn okio.**
-dontwarn javax.annotation.**
-dontwarn com.android.volley.toolbox.**

##### okhttp #####
-keepattributes Signature
-keepattributes *Annotation*
-keep class com.squareup.okhttp.** { *; }
-keep interface com.squareup.okhttp.** { *; }
# This is also needed by Picasso
-dontwarn com.squareup.okhttp.**

-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
# This is also needed by Picasso
-dontwarn okhttp3.**

##### okio #####
-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**

##### EventBus #####
-keepclassmembers class ** {
    public void onEvent*(***);
}

# Only required if you use AsyncExecutor
-keepclassmembers class * extends de.greenrobot.event.util.ThrowableFailureEvent {
    <init>(java.lang.Throwable);
}

##### Amplitude #####
-keep class com.amplitude.api.** {*;}

##### DBFlow #####
-keep class com.raizlabs.android.dbflow.config.GeneratedDatabaseHolder

##### Segment #####
-keep class com.segment.analytics.** { *; }
-keep class androidx.lifecycle.DefaultLifecycleObserver