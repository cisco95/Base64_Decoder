# Base64_Decoder
###Decodes Base64 encoded text

Created as a lightweight tool with no dependencies for minimum maintenance required. Used to decode emails that have been base64 encoded mistakenly due to HTML signature sections not being parsed correctly. 


* Uses a RegExp to remove common plaintext that would be present along with the encoded text in my specific case.
* Manually performs conversion by doing the following:
  1. Converts the text to binary.
  2. Re-slices to have 8 bits instead of 6.
  3. Converts back to a string using String.fromCharCode().
 

