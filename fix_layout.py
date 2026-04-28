with open('src/app/layout.tsx', 'rb') as f:
    data = f.read()
# Remove null bytes
clean_data = data.replace(b'\x00', b'')
with open('src/app/layout.tsx', 'wb') as f:
    f.write(clean_data)
print("Cleaned layout.tsx")
