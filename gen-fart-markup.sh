for i in $(ls the-talent/*.mp3); do
  echo "<audio src='$i' preload=auto></audio>"
done
